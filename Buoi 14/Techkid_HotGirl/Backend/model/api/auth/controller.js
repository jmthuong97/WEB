const bcrypt = require('bcryptjs');
const userController = require("../users/controller");

const login = ({
    username,
    password
}) => new Promise((resolve, reject) => {
    // success
    // incorrect username
    // incorrect password
    // internal server error
    userController.getUserForAuth(username)
        .then(user => {
            // [], "false", "", 0, undefined, null == false
            if (!user || !user.password) {
                reject({
                    status: 400, // bad request
                    err: "Incorrect username"
                })
            } else {
                bcrypt.compare(password, user.password) // ma hoa & so sanh password nhap vao
                    .then(result => {
                        if (result) {
                            // success
                            resolve({
                                username: user.username,
                                id: user._id,
                            })
                        } else {
                            reject({
                                status: 400, // bad request
                                err: "Incorrect password"
                            })
                        }
                    })
            }

        })
        .catch(err => reject({
            status: 501, // server error
            err: err
        }))
});

module.exports = {
    login
}