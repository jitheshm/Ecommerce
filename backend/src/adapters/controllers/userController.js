const addUser = require("../../usecase/user/addUser")
const userRepository = require("../repositories/userRepository")
const passwordService=require('../services/password')
module.exports = {
    signup: async (data) => {
        try {
            //console.log(data);
            await addUser(userRepository,passwordService, data)
        } catch (error) {
            throw error
        }
    }
}