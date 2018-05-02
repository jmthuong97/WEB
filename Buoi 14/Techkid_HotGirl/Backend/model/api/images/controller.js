const imageModel = require('./model');

const createImage = ({
    imageUrl,
    title,
    description,
    id
}) => new Promise((resolve, reject) => {
    imageModel.create({
            imageUrl,
            title,
            description,
            createBy: id
        })
        .then(data => resolve({
            id: data._id
        }))
        .catch(err => reject(err))
});

const getAllImages = page => new Promise((resolve, reject) => {
    imageModel.find({
            "active": true
        })
        .sort({
            createAt: -1
        })
        .skip((page - 1) * 20)
        .limit(20)
        .select("_id imageUrl title description createdAt view like")
        .populate("createdBy", "username avatar")
        .exec()
        .then(data => resolve(data))
        .catch(err => reject(err))
});

const getImage = id => new Promise((resolve, reject) => {
    imageModel.find({
            "active": true,
            _id: id
        })
        .select("_id imageUrl title description createdAt createBy view like comment")
        .exec()
        .then(data => resolve(data))
        .catch(err => reject(err))
});

const updateImage = (id, {
    imageUrl,
    title,
    description
}) => new Promise((resolve, reject) => {
    imageModel.update({
            _id: id
        }, {
            imageUrl,
            title,
            description,
        })
        .then(data => resolve(data))
        .catch(err => reject(err))
});

const deleteImage = id => new Promise((resolve, reject) => {
    imageModel.update({
            _id: id
        }, {
            active: false
        })
        .then(data => resolve(data))
        .catch(err => reject(err))
});

const addComment = (imageId, {
        createBy,
        content
    }) =>
    new Promise((resolve, reject) => {
        imageModel.update({
                _id: imageId
            }, {
                $push: {
                    comment: {
                        createBy,
                        content
                    }
                }
            })
            .then(data => resolve(data))
            .catch(err => reject(err))
    });

const deleteComment = (idImage, idComment) => new Promise((resolve, reject) => {
    imageModel.update({
            _id: idImage
        }, {
            $pull: {
                comment: {
                    _id: idComment
                }
            }
        })
        .then(data => resolve(data))
        .catch(err => reject(err))
});

const likeImage = id => new Promise((resolve, reject) => {
    imageModel.findOneAndUpdate({
            _id: id
        }, {
            $inc: {
                'like': 1
            }
        })
        .then(data => resolve(data))
        .catch(err => reject(err))
});

const unlikeImage = id => new Promise((resolve, reject) => {
    imageModel.findOneAndUpdate({
            _id: id
        }, {
            $inc: {
                'like': -1
            }
        })
        .then(data => resolve(data))
        .catch(err => reject(err))
});

module.exports = {
    createImage,
    getAllImages,
    getImage,
    updateImage,
    deleteImage,
    addComment,
    deleteComment,
    likeImage,
    unlikeImage
}