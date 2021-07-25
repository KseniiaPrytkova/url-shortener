// middleware - this is a common function that allows you to intercept some data and do some logic
const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req, res, next) => {
    // base check is a special method RESP API cat checks server availability
    // if it's OPTIONS does not need to do anything, return next, that is, we continue to make the request
    if (req.method === 'OPTIONS') {
        return next()
    }

    try {
        // get token object
        const token = req.headers.authorization.split(' ')[1] // "Bearer TOKEN"

        if (!token) {
            return res.status(401).json({ message: 'There are no authorization' })
        }

        // if there is a token, we need to decode it
        const decoded = jwt.verify(token, config.get('jwtSecret'))
        // put the decoder token into the request object (create a user field there and put it there)
        req.user = decoded
        // the next () method is to continue executing the request
        next()
    } catch (e) {
        res.status(401).json({ message: 'There are no authorization' })
    }
}