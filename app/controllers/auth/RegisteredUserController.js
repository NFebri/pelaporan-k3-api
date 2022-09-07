const { User } = require('../../models')
var bcrypt = require("bcryptjs")

const register = async (req, res) => {
    // Save User to Database
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(user => {
        if (user) {
            res.status(400).send({
                message: "Failed! Email is already in use!"
            })
        }
        User.create({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            role: req.body.role,
            password: bcrypt.hashSync(req.body.password, 8)
        }).then(user => {
            res.status(201).json({
                user,
            });
        }).catch(err => {
            res.status(500).json({ error: err.message })
        })
    }).catch(err => {
        res.status(500).json({ error: err.message })
    })
};

module.exports = {
    register   
}