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
            console.log(users);
            res.send(users);
        })
        .catch(err => {
            console.log(err);
        })
}