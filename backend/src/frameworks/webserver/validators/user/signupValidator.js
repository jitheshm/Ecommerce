module.exports = () => {
    const valObj = {
        firstName: {
            trim: true,
            isEmpty: {
                errorMessage: 'First Name cannot be empty',
                negated: true
            },
            matches: {
                errorMessage: 'First Name should not contain spaces between the first three letters',
                options: /^[^\s]{3}/
            }
        },
        lastName: {
            trim: true,
            isEmpty: {
                errorMessage: 'Last Name cannot be empty',
                negated: true
            },
            isLength: {
                errorMessage: 'Last Name should be atleast 1 characters long',
                options: { min: 1 }
            }
        },
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
                options: { min: 6 }
            }
        }

    }
    return valObj
}