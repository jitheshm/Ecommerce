class User {
    constructor({ firstName, lastName, email, password, age, gender, phone, authenticationId, authenticationProvider, isVerified }) {
        this.firstName = firstName || 'user'
        this.lastName = lastName
        this.email = email
        this.password = password
        this.age = age
        this.gender = gender
        this.phone = phone
        this.isVerified = isVerified || false
        this.isBlocked = false
        this.authenticationId = authenticationId
        this.authenticationProvider = authenticationProvider
        

    }
}

module.exports = User