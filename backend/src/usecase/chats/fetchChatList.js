module.exports = async (id, chatRepository) => {
    return await chatRepository.chatList(id)
}