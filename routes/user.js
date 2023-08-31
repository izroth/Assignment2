const express = require('express');
const router = express.Router();

const signup = require('../controllers/Signup');
const login = require('../controllers/Login');
const ForgotPassword = require('../controllers/ForgotPassword');

router.post('/signup', signup);
router.post('/login', login);
router.post('/forgotpassword', ForgotPassword);

module.exports = router;


