const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentModel = new Schema({
    createBy: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
}, {
    timestamps: {
        createdAt: "createAt"
    }
})

const imageModel = new Schema({
    imageUrl: {
        type: String,
        require: true
    },
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        default: ""
    },
    createBy: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        require: true
    },
    view: {
        type: Number,
        default: 0
    },
    like: {
        type: Number,
        default: 0
    },
    active: {
        type: Boolean,
        default: true
    },
    comment: {
        type: [commentModel],
        default: []
    }
}, {
    timestamps: {
        createdAt: "createAt"
    }
});

module.exports = mongoose.model("images", imageModel);