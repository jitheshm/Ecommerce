const mongoose=require('mongoose')
const {mongodb_uri}=require("../config")

module.exports={
    connect: async () => {
        try {
            await mongoose.connect(mongodb_uri)
            console.log("database connected successfully");
        } catch (err) {
            console.log("database connection failed" + err);
        }
    }
}