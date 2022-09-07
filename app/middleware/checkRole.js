const { User } = require('../models')

const isAdmin = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        if (user.role === 'admin') {
            next();
            return;
        }
        res.status(403).send({
            message: "Require Admin Role!"
        });
        return;
    });
};

const isUser = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        if (user.role === 'user') {
            next();
            return;
        }
        res.status(403).send({
            message: "Require user Role!"
        });
        return;
    });
};
const isUserOrAdmin = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        if (user.role === 'admin' || user.role === 'user') {
            next();
            return;
        }
        res.status(403).send({
            message: "Require Admin or user Role!"
        });
        return;
    });
};

module.exports = {
    isAdmin,
    isUser,
    isUserOrAdmin
}