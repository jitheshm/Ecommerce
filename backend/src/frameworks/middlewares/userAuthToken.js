const userRepository = require("../../adapters/repositories/userRepository");
const { verifyToken } = require("../../adapters/services/authService");
const isBlocked = require("../../usecase/user/isBlocked");

const userAuthToken = async (req, res, next) => {
    try {
        const token = req.header('Authorization');
        if (token) {
            const decode = await verifyToken(token)
            console.log(decode);
            if (decode && decode.role === 'user' && decode.isVerified === true) {
                const blocked = await isBlocked(userRepository, decode.id)
                if (!blocked) {
                    req.user = decode
                    next()
                } else {
                    res.status(401).json({ error: "unauthorised" })
                }
            } else {
                res.status(401).json({ error: "unauthorised" })
            }
        } else {
            res.status(401).json({ error: "unauthorised" })
        }

    }
    catch (error) {
        console.log(error.message);
        if (error.message === "jwt expired") {
            res.status(401).json({ error: "unauthorised" })
        }
        else {
            res.status(500).json({ "error": "internal server error" })
        }
    }

}

module.exports = userAuthToken