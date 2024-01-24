const addUser = require("../../usecase/user/addUser")
const userRepository = require("../repositories/userRepository")

module.exports = {
    signup: async (data) => {
        try {
            //console.log(data);
            await addUser(userRepository, data)
        } catch (error) {
            throw error
        }
    }
}