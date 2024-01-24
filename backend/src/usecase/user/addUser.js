
const User = require('../../entity/userEntity')


const addUser = async (repository,passwordService, data) => {
    try {
        await repository.checkUser(data)
        const hash = await passwordService.hashPassword(data.password)
        data.password = hash
        console.log(data);
        const user = new User(data)
        console.log(user);
        await repository.create(user)
    } catch (error) {
        
        throw error
    }

}

module.exports = addUser