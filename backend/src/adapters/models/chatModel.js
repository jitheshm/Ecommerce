const mongoose = require('mongoose');
var Schema = mongoose.Schema
const ChatSchema = new mongoose.Schema({
    users: {
        type:[{ type: Schema.ObjectId}]
    },

    chats: {
        type: [
            {
                sender: { type: Schema.ObjectId, required: true },
                recipient: { type: Schema.ObjectId, required: true },
                message: { type: String, required: true },
                date: { type: Date, required: true }

            }
        ], required: true
    },


});

const Chat = mongoose.model('Chat', ChatSchema);

module.exports = Chat;