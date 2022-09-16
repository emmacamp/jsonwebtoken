import { Router } from 'express';
const router = Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('../config')
import { verifyToken } from './verifyToken';

router.post('/signup', async (req, res, next) => {
    const { username, email, password } = req.body;
    const user = new User(
        {
            username,
            email,
            password
        });

    user.password = await user.encryptPassword(password);
    await user.save();

    const token = jwt.sign({ id: user._id }, config.SECRET, {
        expiresIn: 60 * 60 * 24
    });

    console.log(user);
    // res.json({ message: 'User created' });
    res.json({ auth: true, token });

});

router.post('/signin', async (req, res, next) => {
    const { email, password } = req.body
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).send("The email does't exist");
    }

    const validPassword = await user.validatePassword(password);
    if (!validPassword) {
        return res.status(401).json({ auth: false, token: null });
    }

    const token = jwt.sign({ id: user._id }, config.SECRET, {
        expiresIn: 60 * 60 * 24
    });

    res.json({ auth: true, token });
})


router.get('/me', verifyToken, async (req, res, next) => {
    //if token is valid, execute this code:
    const user = await User.findById(decoded.id, { password: 0 })
    if (!user) {
        return res.status(404).send('No user found')
    }
    res.json(user)
});

router.get('/dashboard', verifyToken, (req, res, next) => {
    res.json('dashboard');
});


export default router;