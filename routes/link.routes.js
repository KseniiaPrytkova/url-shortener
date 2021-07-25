const {Router} = require('express')
const config = require('config')
const shortid = require('shortid')
const Link = require('../models/Link')
const auth = require('../middleware/auth.middleware')
const router = Router()

// there are 3 endpoints here
router.post('/generate', auth, async (req, res) => {
    try {
        const baseUrl = config.get('baseUrl')
        // from the frontend we get the from object - that is, the path from where we make this link
         // later we will need to redirect the user along this path
        const {from} = req.body

        // npm short id
        // npm i shortid
        const code = shortid.generate()
        console.log('CODE:', code)
        // check if the database already has such a link from
        const existing = await Link.findOne({ from })
        if (existing) {
            return res.json({ link: existing })
        }

        // we will form the link that is shortened
        const to = baseUrl + '/t/' + code

        const link = new Link({
            code, to, from, owner: req.user.userId
        })

        await link.save()

        res.status(201).json({ link })


    } catch (e) {
        res.status(500).json({ message: 'Something went wrong... (in link.routes post)'})
    }
})

router.get('/', auth, async (req, res) => {
    try {
        // to get all links from db:
        const links = await Link.find({ owner: req.user.userId }) //?? how to detect what user owns this links
        // we need to receive data from the front end for the user - we can do this using the jwt token
        // because in the jwt token we have coded the user id
        res.json(links)
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong... (link.routes get)'})
    }
})

// getting the link by id
router.get('/:id', auth, async (req, res) => {
    try {
        const link = await Link.findById(req.params.id)
        res.json(link)
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong... (link.routes get id)'})
    }
})

module.exports = router