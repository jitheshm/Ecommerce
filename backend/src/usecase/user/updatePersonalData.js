module.exports = async (userRepository, userId, data) => {
    
    if (!/^[^\s]{3}[\s\S]*$/.test(data.firstName) || data.firstName === undefined || data.firstName === null || data.firstName === '') {
        const error = new Error("Invalid first name")
        error.statusCode = 400
        throw error
    }
    if (data.lastName.trim() === "" || data.lastName === undefined || data.lastName === null || data.lastName === '') {
        const error = new Error("Invalid last name")
        error.statusCode = 400
        throw error
    }

    if (!/^\S+@\S+\.\S+$/.test(data.email) || data.email === undefined || data.email === null || data.email === '') {
        const error = new Error("Invalid email")
        error.statusCode = 400
        throw error
    }
    if (data.age < 0 || !/^\d+$/.test(data.age) || isNaN(data.age) || data.age > 100 || data.age === undefined || data.age === null || data.age === '') {
        const error = new Error("Invalid age")
        error.statusCode = 400
        throw error
    }
    if (data.phone < 0 || !/^[0-9\b]+$/.test(data.phone) || String(data.phone).length != 10 || data.phone === undefined || data.phone === null || data.phone === '') {
        const error = new Error("Invalid phone no")
        error.statusCode = 400
        throw error
    }


    return await userRepository.updatePersonalData(userId, data)
}