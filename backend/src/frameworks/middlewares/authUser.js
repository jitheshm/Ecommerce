const { verifyToken } = require("../../adapters/services/authService")

const authUser = (token) => {
    try {
        const decode = verifyToken(token)
        return decode
    }
    catch (error) {
        console.log(error);
    }

}