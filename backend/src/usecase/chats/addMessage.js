module.exports = async (msgObj, chatRepository, users) => {
    console.log("hai");
    const res = await chatRepository.saveMessage(msgObj, users)
    console.log(res);
    return res

}