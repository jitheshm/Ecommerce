const bcrypt = require('bcrypt');
const saltRounds = 10;
 module.exports={
    hashPassword:async(password)=>{
        const hash = await bcrypt.hash(password, saltRounds)
        return hash
    }
 }