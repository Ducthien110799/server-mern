const mongoose = require('mongoose')

const FriendSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    age: {
        type: Number,
        require: true
    }
});

const FriendModel = mongoose.model('friends', FriendSchema);

module.exports = FriendModel;

