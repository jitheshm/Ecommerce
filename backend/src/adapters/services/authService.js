var jwt = require('jsonwebtoken');
var secretKey = "secretuser"


module.exports={
    createToken:async(user)=>{
        console.log(user);
        const token = await jwt.sign(user, secretKey, { expiresIn: '1h' });
        return token
    },
    verifyToken:async (token)=>{
        console.log(token);
        const decoded = await jwt.verify(token, secretKey);
        return decoded
    }
}