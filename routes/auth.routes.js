// nак создать роут в экспрессе 
const {Router} = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const {check, validationResult} = require('express-validator')
const User = require('../models/User')
const router = Router()

// префикс этого роута /api/auth + register(например)
// 2й парам - ф-я где пропишем логику 
router.post(
    '/register',
    // массив мидлвееров, кот будут делать валидацию
    [
        check('email', 'Wrong email').isEmail(),
        check('password', 'Minimum password length must be 6 chars')
            .isLength({ min: 6 })
    ],
    async (req, res) => {
    // ассинхрон запросы лучше обраб с помощью ф-и try catch - GOOD PRACTISE!!!
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

        // а есть ли уже такой эмеил у нас в базе
        const candidate = await User.findOne({ email })
        if (candidate) {
            return res.status(400).json({ message: 'This user already exists'})
        }

        // в против случае создадим нового польз и захешируем его пароль, чтоб не взломали
        // npm i bcryptjs
        const hashedPassword = await bcrypt.hash(password, 12)
        const user = new User({ email, password: hashedPassword })
        // ждем пока польз сохранится
        await user.save()
        res.status(500).json({ message: 'User was created'})
    } catch (e) {
        // с помощью объекта responce
        res.status(500).json({ message: 'Something went wrong...'})
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

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: 'User not found' })
        }

        // пользователя мы нашли, теперь нужно проверить а совпадают ли его пароли
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ message: 'Wrong password, try again' })
        }

        // если дошли до этого этапа знач с польз все хорошо и нужно сделать его авторизацию
        // т.к у нас single page app, авторизацию будем делать через jwt token
        const token = jwt.sign(
            // 1й парам: те данные что должны быть зашифр в jwt token'e
            { userId: user.id },
            // 2й парам: нек секрет ключ, создадим его в конфиге
            config.get('jwtSecret'),
            // 3й парам: через сколько jwt token закончит существование; рекоменд 1 час
            { expiresIn: '1h' }
        )

        res.json({ token, userId: user.id })
        
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong...'})
    }

})

module.exports = router