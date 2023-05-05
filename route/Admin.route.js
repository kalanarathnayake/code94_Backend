const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const { getAdmin, login, register } = require('../controller/Admin.controller');

//@route  GET api/admin
//@desc   get admin
//@access Private
router.get('/', auth, getAdmin);

//@route  GET api/admin/login
//@desc   login
//@access Public
router.post('/login', login);

//@route  POST api/admin/register
//@desc   register admin
//@access Public
router.post('/register', register);

module.exports = router;
