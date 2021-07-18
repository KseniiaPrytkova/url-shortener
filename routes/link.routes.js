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
        // с фронтэнда получаем объект from - т.е тот путь откуда мы делаем данную ссылку
        // в последств нам нужнг будет редиректить польз п данному пути
        const {from} = req.body

        // npm short id
        // npm i shortid
        const code = shortid.generate()
        // проверим а есть ли в базе уже такая ссылка from
        const existing = await Link.findOne({ form })
        if (existing) {
            return res.json({ link: existing })
        }

        // cформируем ту ссылку кот явл сокращ
        const to = baseUrl + '/t' + code

        const link = new Link({
            code, to, from, owner: req.user.userId
        })

        await link.save()

        res.status(201).json({ link })


    } catch (e) {
        res.status(500).json({ message: 'Something went wrong... (link.routes)'})
    }
})

router.get('/', auth, async (req, res) => {
    try {
        // to get all links from db:
        const links = await Link.find({ owner: req.user.userId }) //?? how to detect what user owns this links
        // нам надо получ дан с фронт энда по пользователю - можем это сделать по jwt токену
        // ибо в jwt токен мы закодир юзер id
        res.json(links)
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong... (link.routes)'})
    }
})

// getting the link by id
router.get('/:id', auth, async (req, res) => {
    try {
        const link = await Link.findById(req.params.id)
        res.json(link)
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong... (link.routes)'})
    }
})

module.exports = router