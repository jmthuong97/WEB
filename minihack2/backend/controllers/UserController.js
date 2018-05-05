
const userSchema = require("../models/UserSchema");
const mongoose = require('mongoose');

let createUser = (name, callback) => {
    let createPromises = [];
    for (let i = 0; i < 4; i++) {
        let newUser = {
            idGame: 0,
            noUser: i + 1,
            name: name[i]
        }
        createPromises.push(userSchema.create(newUser))
    };

    Promise.all(createPromises)
        .then(users => {
            callback(users.map(x => x.id));
        })
};

// ================================== UPDATE ================================== 
let updateUser = (id, idUsers) => {
    for (let i = 0; i < 4; i++) {
        console.log(idUsers[i]);
        userSchema.findByIdAndUpdate(idUsers[i], { $set: { idGame: id } }, { upsert: true }, function (err, result) {
            if (err) { console.log(err) }
        });
    }
}

module.exports = {
    createUser,
    updateUser
}