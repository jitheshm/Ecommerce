
const User = require('../../entity/userEntity')


const addUser = async (repository, passwordService, data) => {

    if (!/^[^\s]{3,}$/.test(data.firstName)||data.firstName === undefined || data.firstName === null || data.firstName === '') {
        const error = new Error("Invalid first name")
        error.statusCode = 400
        throw error
    }
    if (data.lastName.trim() === ""||data.lastName === undefined || data.lastName === null || data.lastName === '') {
        const error = new Error("Invalid last name")
        error.statusCode = 400
        throw error
    }

    if (!/^\S+@\S+\.\S+$/.test(data.email)||data.email === undefined || data.email === null || data.email === '') {
        const error = new Error("Invalid email")
        error.statusCode = 400
        throw error
    }
    if (data.password === ""||data.password === undefined || data.password === null || data.password === '') {
        const error = new Error("password cannot be empty")
        error.statusCode = 400
        throw error
    }


    const existUser = await repository.checkUser(data)
    console.log(existUser)
    if (existUser && existUser.isVerified) {
        return null
    } else if (existUser) {
        return existUser
    } else {
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