const { verifyToken } = require("../../adapters/services/authService")

const adminAuthToken = async(req, res, next) => {
    try {
        const token = req.header('Authorization');
        if(token){
            const decode = await verifyToken(token)
            console.log(decode);
            if (decode && decode.role==='admin') {
                req.user = decode
                next()
            }else{
                res.status(401).json({error:"unauthorised"})
            }
        }else{
            res.status(401).json({error:"unauthorised"})
        }
        
    }
    catch (error) {
        res.status(500).json({ "error": "internal server error" })
    }

}

module.exports = adminAuthToken