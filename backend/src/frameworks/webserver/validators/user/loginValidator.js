module.exports = () => {
    const valObj = {

        email: {
            isEmail: {
                errorMessage: 'Invalid Email'
            }
        },
        password: {
            trim: true,
            isEmpty: {
                errorMessage: 'password cannot be empty',
                negated: true
            },
            isLength: {
                errorMessage: 'Password should be atleast 6 characters long',
                options: { min: 3 }
            }
        }

    }
    return valObj
}