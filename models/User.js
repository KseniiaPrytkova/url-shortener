const {Schema, model, Types} = require('mongoose')

const schema  = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    // this is a bunch of the user model and the definition of records in the database
     // which collection we bind to ref: 'Link'
    links: [{type: Types.ObjectId, ref: 'Link'}]
})

module.exports = model('User', schema)