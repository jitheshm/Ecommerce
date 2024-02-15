module.exports = () => {
    const valObj = {
        name: {
            trim: true,
            isEmpty: {
                errorMessage: 'Name cannot be empty',
                negated: true
            },
            matches: {
                errorMessage: 'Name should not contain spaces between the first three letters',
                options: /^[^\s]{3}/
            }
        },
        phone: {
            trim: true,
            isEmpty: {
                errorMessage: 'Phone cannot be empty',
                negated: true
            },
            isLength: {
                errorMessage: 'Phone should be atleast 10 characters long',
                options: { min: 10 }
            }
        },
        
        userId: {
            trim: true,
            isEmpty: {
                errorMessage: 'User ID cannot be empty',
                negated: true
            },
            isMongoId: {
                errorMessage: 'User ID should be a valid MongoID'
            }
        },
        pincode: {
            trim: true,
            isEmpty: {
                errorMessage: 'Pincode cannot be empty',
                negated: true
            },
            isLength: {
                errorMessage: 'Pincode should be exactly 6 characters long',
                options: { min: 6, max: 6 }
            }
        },
        locality: {
            trim: true,
            isEmpty: {
                errorMessage: 'Locality cannot be empty',
                negated: true
            },
            isLength: {
                errorMessage: 'locality should be atleast 3 characters long',
                options: { min: 3 }
            }
        },
        street: {
            trim: true,
            isEmpty: {
                errorMessage: 'Street cannot be empty',
                negated: true
            },
            isLength: {
                errorMessage: 'street should be atleast 3 characters long',
                options: { min: 3 }
            }
        },
        city: {
            trim: true,
            isEmpty: {
                errorMessage: 'City cannot be empty',
                negated: true
            },
            isLength: {
                errorMessage: 'city should be atleast 3 characters long',
                options: { min: 3 }
            }
        },
        state: {
            trim: true,
            isEmpty: {
                errorMessage: 'State cannot be empty',
                negated: true
            },
            isLength: {
                errorMessage: 'state should be atleast 3 characters long',
                options: { min: 3 }
            }
        },
        addressType: {
            trim: true,
            isEmpty: {
                errorMessage: 'Address Type cannot be empty',
                negated: true
            },
            isIn: {
                errorMessage: 'Address Type should be either "Home" or "Work"',
                options: [['Home', 'Work']]
            }
        }


    }
    return valObj
}