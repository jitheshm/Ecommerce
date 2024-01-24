const UserModel = require('../models/userModel')
module.exports = {
    create: async (data) => {
        try {
            const user = new UserModel(data)
            console.log(user);
            await user.save()
            
            console.log("new user inserted");
            return user._id
        } catch (error) {
            console.log("user insertion failed" + error);
        }
    },
    checkUser: async(data) => {
        try {
            const existUser= await UserModel.findOne({email:data.email})
            if(existUser){
             throw new Error("user already exsit")
            }
        } catch (error) {
            //console.log(error.message);
            throw error

        }
    }
}
