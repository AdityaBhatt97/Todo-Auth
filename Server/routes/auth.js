// const router = require("express").Router();
const express = require("express")
const router = express.Router()
const authController = require("../controller/authController");
const verifyJWT = require('../middlewares/verifyJwt')


router.route('/register').post(authController.register)
router.route('/login').post(authController.login)
router.route('/refresh').get(authController.refresh)
router.route('/logout').post(authController.logout)
router.route('/check').get(verifyJWT , authController.authCheck)


module.exports = router