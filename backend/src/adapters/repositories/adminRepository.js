const AdminModel = require('../models/adminModel')
module.exports={
    findAdmin:async(data)=>{
        try {
            const existUser = await AdminModel.findOne({ userName: data.userName })
            return existUser
        } catch (error) {
            //console.log(error.message);
            console.log(error);
            throw error


        }
    }
}