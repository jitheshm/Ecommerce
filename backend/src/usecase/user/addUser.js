
const User = require('../../entity/userEntity')


const addUser = async (repository, passwordService, data) => {
   
        const existUser = await repository.checkUser(data)
        if (existUser) {
            return null
        } else {
            const hash = await passwordService.hashPassword(data.password)
            data.password = hash
            console.log(data);
            const user = new User(data)
            console.log(user);
            const userId = await repository.create(user)
            return userId
        }

   

}

module.exports = addUser