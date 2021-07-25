// THIS IS A MODEL OF THE LINK
const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    // understand where this link comes from 
    from: {type: String, required: true},
    // where this link will lead
    to: {type: String, required: true, unique: true},
    code: {type: String, required: true, unique: true},
    // when this link was created 
    date: {type: Date, default: Date.now},
    // number of clicks on the link
    clicks: {type: Number, default: 0},
    // you need to associate these links with the user who created it
    owner: {type: Types.ObjectId, ref: 'User'}
})

module.exports = model('Link', schema)