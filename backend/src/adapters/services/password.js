const bcrypt = require('bcrypt');
const saltRounds = 10;
 module.exports={
    hashPassword:async(password)=>{
        const hash = await bcrypt.hash(data.password, saltRounds)
        return hash
    }
 }