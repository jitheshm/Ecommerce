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
        age: {
            trim: true,
            isInt: {
                errorMessage: 'Age should be a valid integer'
            },
            isLength: {
                errorMessage: 'Age should be between 1 and 3 characters long',
                options: { min: 1, max: 3 }
            }
        },
        gender: {
            
            trim: true,
            isEmpty: {
                errorMessage: 'Gender cannot be empty',
                negated: true
            },
            isIn: {
                errorMessage: 'Gender should be either "Male", "Female" ',
                options: [['Male', 'Female']]
            }
        },
        phone: {
            isNumeric: {
                errorMessage: 'Phone should be a valid number'
            },
            isLength: {
                errorMessage: 'Phone should be exactly 10 digits long',
                options: { min: 10, max: 10 }
            },
            custom: {
                options: (value) => {
                    const regex = /(.)\1{9}/; // Matches 10 continuous same numbers
                    return !regex.test(value);
                },
                errorMessage: 'Phone should not have 10 continuous same numbers'
            }
        }


    }
    return valObj
}