// ЭТО МОДЕЛЬ ССЫЛКИ
const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    // понимать откуда идет данная ссылка 
    from: {type: String, required: true},
    // куда будет вести данная ссылка 
    to: {type: String, required: true, unique: true},
    code: {type: String, required: true, unique: true},
    // когда данная ссылка была создана 
    date: {type: Date, default: Date.now},
    // количество кликов по ссылке
    clicks: {type: Number, default: 0},
    // необх связать эти ссылки с пользователем кот ее создал
    owner: {type: Types.ObjectId, ref: 'User'}
})

module.exports = model('Link', schema)