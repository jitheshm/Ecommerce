
const User = require('../../entity/userEntity')


const addUser = async (repository, passwordService, data) => {
   
        const existUser = await repository.checkUser(data)
        console.log(existUser)
        if (existUser && existUser.isVerified) {
            return null
        }else if(existUser){
            return existUser
        }else {
            const hash = await passwordService.hashPassword(data.password)
            data.password = hash
            console.log(data);
            const userObj = new User(data)
            //console.log(user);
            const user = await repository.create(userObj)
            return user
        }

   

}

module.exports = addUser