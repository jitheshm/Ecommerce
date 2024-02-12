class User {
    constructor({ firstName, lastName, email, password, age, gender, phone, action }) {
        this.firstName = firstName
        this.lastName = lastName
        this.email = email
        this.password = password
        this.age = age
        this.gender = gender
        this.phone = phone
        this.isVerified = false
        this.isBlocked = false
        this.dateOfJoin = new Date()
    }
}

module.exports = User