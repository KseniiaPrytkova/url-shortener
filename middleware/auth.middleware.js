// middleware - это обычная ф-я позвол перехватывать нек данные и делать нек локику
const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req, res, next) => {
    // баз провер - это спец метод RESP API кот провер доступность сервера
    // т.е если это опшинс ничего делать не нужно, возвращ нэкст, т.е продолжаем делать запрос
    if (req.method === 'OPTIONS') {
        return next()
    }

    try {
        // получ объект токена 
        const token = req.headers.authorization.split(' ')[1] // "Bearer TOKEN"

        if (!token) {
            return res.status(401).json({ message: 'There are no authorization' })
        }

        // если токен есть, нам нужно его ракодировать 
        const decoded = jwt.verify(token, config.get('jwtSecret'))
        // кладем раскодир токен в объект рэквеста (создам там поле юзер и туда положу)
        req.user = decoded
        // метод next() - это продолжить выполнение запроса 
        next()
    } catch (e) {
        res.status(401).json({ message: 'There are no authorization' })
    }
}