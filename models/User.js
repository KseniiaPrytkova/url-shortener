const {Schema, model, Types} = require('mongoose')

const schema  = new Schema({
    email: {type: String, required: true, unique: true},
    email: {type: String, required: true},
    // это связка модели пользователя и определен записей в БД
    // к какой коллекции мы привяз ref: 'Link'
    links: [{type: Types.ObjectId, ref: 'Link'}]
})

module.exports = model('User', schema)