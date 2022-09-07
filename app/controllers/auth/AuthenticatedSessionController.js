const config = require("../../../config/auth");
const { User } = require('../../models');
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

const login = async (req, res) => {
    User.findOne({
        where: {
            email: req.body.email,
        },
    }).then((user) => {
        if (!user) {
            return res.status(404).send({ message: "User Not found." });
        }
        var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );
        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: "Invalid Password!",
            });
        }
        var token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 86400, // 24 hours
        });
        
        res.status(200).send({
            id: user.id,
            name: user.name,
            email: user.email,
            accessToken: token,
        });
    }).catch((err) => {
        res.status(500).send({ message: err.message });
    });
};

module.exports = {
    login   
}
