const Token = require("../../entity/tokenEntity")
const User = require("../../entity/userEntity")

module.exports = async (user, userRepository,authService) => {
    let userData = null
    const existUser = await userRepository.checkUser(user)
    console.log(existUser)
    if (existUser && existUser.isVerified && !existUser.isBlocked) {
        userData = existUser
    } else if (!existUser) {
        user.isVerified = true
       
        console.log(user);
        const userObj = new User(user)
        console.log(userObj);
        userData = await userRepository.create(userObj)

    }

    if (userData) {
        const tokenData = new Token(userData, "user")
        console.log(tokenData);
        const token = await authService.createToken(tokenData)
        console.log(token);

        return token
    } else {
        return null
    }
}