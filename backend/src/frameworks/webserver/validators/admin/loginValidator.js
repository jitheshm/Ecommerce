module.exports = () => {
    const valObj = {

        userName: {
            trim: true,
            isEmpty: {
                errorMessage: 'User Name cannot be empty',
                negated: true
            },
            matches: {
                errorMessage: 'Invalid User Name format',
                options: /^[^\s]{3}/
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
                options: { min: 5 }
            }
        }

    }
    return valObj
}