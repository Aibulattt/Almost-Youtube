const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    email: {type: String, required: true, unique: true},
    login: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    username: {type: String, required: true},
    favQuery: [{type: Types.ObjectId, ref: 'FavQuery'}]
})

module.exports = model('User', schema);