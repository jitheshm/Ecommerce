const { findAdmin } = require("../../../adapters/controllers/adminController");
const { addMessage, fetchChatList, fetchMessageList } = require("../../../adapters/controllers/chatController");
const { verifyToken } = require("../../../adapters/services/authService");
const { ObjectId } = require('mongodb');
const users = {}
const active = new Set()
let adminId
// (async () => {
//     let admin = await findAdmin({ userName: "admin" })
//     console.log(admin, "admin");
//     adminId = admin._id
// })()

const socketHandler = async (socket, io) => {
    try {
        console.log('A user connected', socket.id);
        const { headers } = socket.handshake;
        const token = headers.authorization; // Assuming the authorization header contains the token
        console.log(token);
        const decode = await verifyToken(token)
        console.log(decode.id);

        if (decode.role === 'user') {
            users[decode.id] = socket.id
            active.add(socket.id)
            if (!adminId) {
                data = await findAdmin({ userName: "admin" })
                adminId = data._id
            }
            io.to(users[decode.id]).emit('adminId', adminId)
        }
        else if (decode.role === 'admin') {
            if (!adminId) {
                data = await findAdmin({ userName: "admin" })
                adminId = data._id
            }
            users[adminId] = socket.id
            active.add(socket.id)
        }
        console.log(active);
        console.log(users);
        if (decode.role === 'admin') {
            const list = await fetchChatList(new ObjectId(decode.id))
            io.to(users[decode.id]).emit('usersList', list)
        }

        socket.on('disconnect', () => {
            console.log('User disconnected');
            active.delete(socket.id)
        });
        socket.on('getpreviousmessages', async (data) => {
            let messages = await fetchMessageList(new ObjectId(data.userId), new ObjectId(decode.id))
            console.log("hai");
            console.log(messages);

            io.to(users[decode.id]).emit('previousmessages', messages[0])
        })

        // Example: handling a chat message event
        socket.on('chat message', async (data) => {
            let { recipientId, message, date } = data;
            recipientId = recipientId === 'admin' ? adminId : recipientId
            let sender = await verifyToken(token)
            sender = sender.id
            const messageObj = {
                sender: sender,
                recipient: recipientId,
                message: message,
                date: date
            }
            const usersObj = {
                user1: recipientId,
                user2: sender
            }
            await addMessage(messageObj, usersObj)
            console.log(`${recipientId}`);
            const recipientSocketId = users[`${recipientId}`]
            console.log(recipientSocketId);


            if (active.has(recipientSocketId)) {
                console.log(`message-${sender}`);
                io.to(recipientSocketId).emit(`message-${sender}`, messageObj)
                const list = await fetchChatList(new ObjectId(recipientId))
                io.to(recipientSocketId).emit('usersList', list)
            } else {
                console.log("user is not in online");
            }




        });


    } catch (error) {
        console.log(error);
    }
}

module.exports = socketHandler