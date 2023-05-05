const bcrypt = require('bcryptjs'); //hash feature
const Admin = require('../model/Admin.model');
const jwt = require('jsonwebtoken');

//get Admin details
const getAdmin = async (req, res) => {
    try {
        //get user details
        //-password : dont return the pasword
        console.log(req.user);
        const user = await Admin.findById(req.user._id).select('-password');
        res.status(200).json(user);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
};

//Authenticate admin and get token
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        //See if user Exist
        let user = await Admin.findOne({ email: email });
        console.log(user);
        if (!user) {
            return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
        }

        //match the user email and password

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
        }

        //Return jsonwebtoken

        const token = await user.generateAuthToken();
        return res.status(200).json({ tokenId: token });
    } catch (err) {
        //Something wrong with the server
        console.error(err.message);
        return res.status(500).send('Server Error');
    }
};

//Register admin
const register = async (req, res) => {
    console.log('here');
    const { fullName, email, password } = req.body;

    try {
        //See if user Exist
        let user = await Admin.findOne({ email });
        console.log(req.body, user);
        if (user) {
            return res.status(400).json({ errors: [{ msg: 'Admin already exist' }] });
        } else {
            const newUser = new Admin({
                fullName: fullName,
                email: email,
                password: password,
            });

            const registerdUser = await newUser.save();
            await newUser.generateAuthToken();
            return res.status(201).json(registerdUser);
        }
    } catch (err) {
        //Something wrong with the server
        console.error(err.message);
        return res.status(500).send('Server Error');
    }
};

module.exports = { getAdmin, login, register };
