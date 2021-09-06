const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    query: {type: String, required: true},
    maxResults: {type: Number, required: true},
    order: {type: String, required: true},
    owner: {type: Types.ObjectId, ref: 'User'}
})

module.exports = model('FavQuery', schema);