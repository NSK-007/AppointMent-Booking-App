const User = require("../models/user")

exports.postAppointment = (req, res, next) => {
    User.create({
        name :req.body.name,
        email: req.body.mail,
        phone: req.body.phone
    })
    .then((user) => {
        console.log('inserted');
        res.send(user);
    })
    .catch(err => {
        console.log(err);
    })
}

exports.getAppointments = (req, res, next) => {
    User.findAll()
        .then((users) => {
            // console.log(users);
            res.send(users);
        })
        .catch(err => {
            console.log(err);
        })
}

exports.getAppointmentById = (req, res, next) => {
    const user_id = req.params.id;
    console.log(user_id);
    User.findByPk(user_id)
        .then(user => {
            res.send(user);
        })
        .catch(err => {
            console.log(err);
        })
}

exports.editAppointment = (req, res, next) => {
    const user_id = req.params.id;
    // console.log(user_id);
    User.findByPk(user_id)
        .then(user => {
            // console.log(user);
            user.name = req.body.name,
            user.email = req.body.mail,
            user.phone = req.body.phone

            return user.save();
        })
        .then(user => {
            console.log('User saved');
            res.send(user);
        })
        .catch(err => {
            console.log(err);
        })
}

exports.deleteAppointment = (req, res, next) => {
    const user_id = req.params.id;
    User.findByPk(user_id)
        .then(user => {
            user.destroy();
        })
        .catch(err => {
            console.log(err);
        })
}