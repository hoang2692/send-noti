let mongoose = require('mongoose')


const TokenNotificationSchema = new mongoose.Schema({
    token:{
        type: String,
    },
})

const Token = mongoose.model('Token',TokenNotificationSchema, 'Tokens');

module.exports = Token;