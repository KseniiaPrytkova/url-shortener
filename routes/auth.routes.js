// nак создать роут в экспрессе 
const {Router} = require('express')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')
const User = require('../models/User')
const router = Router()

// prefix of this route /api/auth + register(for example)
// 2d param - fn where we write the logic 
router.post(
    '/register',
    // an array of middlewares that will do the validation
    [
        check('email', 'Wrong email').isEmail(),
        check('password', 'Minimum password length must be 6 chars')
            .isLength({ min: 6 })
    ],
    async (req, res) => {
    // asynchronous requests is better to handle with try catch function - GOOD PRACTISE!!!
    try {
        console.log('Body:', req.body)
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Wrong data during Signing up'

            })
        }
        const {email, password} = req.body

        // is there already such an email in our database?
        const candidate = await User.findOne({ email })
        if (candidate) {
            return res.status(400).json({ message: 'This user already exists'})
        }

        // otherwise, we will create a new user and hash its password so as not to be hacked
        // npm i bcryptjs
        const hashedPassword = await bcrypt.hash(password, 12)
        const user = new User({ email, password: hashedPassword })
        // waiting for the user to be saved
        await user.save()
        console.log(user)
        res.status(201).json({ message: 'User was created'})
    } catch (e) {
        // with the help of object responce
        res.status(500).json({ message: 'Something went wrong... while register'})
    }
})

router.post(
    '/login',
    [
      check('email', 'Enter correct email').normalizeEmail().isEmail(),
      check('password', 'Enter password').exists()
    ],
    async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Wrong data during Loging in'
            })
        }

        const {email, password} = req.body
        console.log(req.body)

        const user = await User.findOne({ email })
        console.log(user)
        if (!user) {
            return res.status(400).json({ message: 'User not found' })
        }

        // We found the user, now we need to check if his passwords match
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ message: 'Wrong password, try again' })
        }

        // if you have reached this stage, everything is fine with the user and you need to authorize him
        // because we have single page app, authorization will be done via jwt token
        const token = jwt.sign(
            // 1st param: the data that should be encrypted in the jwt token
            { userId: user.id },
            // 2d param: some secret key, create it in the config
            config.get('jwtSecret'),
            // 3rd param: after how many jwt token will end its existence; recommended 1 hour
            { expiresIn: '1h' }
        )

        res.json({ token, userId: user.id })
        
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong... while login'})
    }

})

module.exports = router