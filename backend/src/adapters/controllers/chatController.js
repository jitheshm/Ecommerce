const addMessage = require("../../usecase/chats/addMessage")
const fetchChatList = require("../../usecase/chats/fetchChatList")
const fetchMessageList = require("../../usecase/chats/fetchMessageList")
const chatRepository = require("../repositories/chatRepository")

module.exports = {
    addMessage: async (messageObj, users) => {
        return await addMessage(messageObj, chatRepository, users)
    },
    fetchChatList: async (id) => {
        return await fetchChatList(id, chatRepository)
    },
    fetchMessageList:async(user1,user2)=>{
        return await fetchMessageList(user1,user2,chatRepository)
    }
}  