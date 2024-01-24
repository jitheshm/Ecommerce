const User = require('../../entity/userEntity')
const bcrypt = require('bcrypt');
const saltRounds = 10;

const addUser = async (repository, data) => {
    try {
        await repository.checkUser(data)
        const hash = await bcrypt.hash(data.password, saltRounds)
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