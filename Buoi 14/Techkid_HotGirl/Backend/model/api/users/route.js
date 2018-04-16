const express = require('express');
const router = express.Router();

const userController = require('./controller');

router.get('/', (req, res) => {
    userController.getAllUsers(req.query.page || 1)
        .then(users => res.send(users))
        .catch(err => {
            console.log(err);
            res.status(500).send(err);
        });
});

router.post('/', (req, res) => {
    userController.createUser(req.body)
        .then(result => res.send(result)) // 
        .catch(err => {
            console.log(err);
            res.status(500).send(err);
        });
});

router.get('/:id', (req, res) => {
    userController.getUser(req.params.id)
        .then(user => res.send(user))
        .catch(err => {
            console.log(err);
            res.status(500).send(err);
        });
});

router.put('/:id/updateUsername', (req, res) => {
    userController.updateUsername(req.params.id, req.body.username)
        .then(id => res.send(id))
        .catch(err => {
            console.log(err);
            res.status(500).send(err);
        });
});

router.put('/:id/updateAvatar', (req, res) => {
    userController.updateUserAvatar(req.params.id, req.body.avatar)
        .then(id => res.send(id))
        .catch(err => {
            console.log(err);
            res.status(500).send(err);
        });
});

router.put('/:id/updateEmail', (req, res) => {
    userController.updateUserEmail(req.params.id, req.body.email)
        .then(id => res.send(id))
        .catch(err => {
            console.log(err);
            res.status(500).send(err);
        });
});

router.put('/:id/updatePassword', (req, res) => {
    userController.updateUserPassword(req.params.id, req.body.password)
        .then(id => res.send(id))
        .catch(err => {
            console.log(err);
            res.status(500).send(err);
        });
});

router.delete('/:id', (req, res) => {
    userController.deleteUser(req.params.id)
        .then(data => res.send(data))
        .catch(err => {
            console.log(err);
            res.status(500).send(err);
        });
});

module.exports = router;