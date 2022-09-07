const { Router } = require('express')
const RegisteredUserController = require("../app/controllers/auth/RegisteredUserController")
const AuthenticatedSessionController = require("../app/controllers/auth/AuthenticatedSessionController")
const router = Router()

router.post('/register', RegisteredUserController.register)
router.post("/login", AuthenticatedSessionController.login)

module.exports = router