module.exports = () => {
    const valObj = {

        title: {
            trim: true,
            isEmpty: {
                errorMessage: 'title cannot be empty',
                negated: true
            }

        },
        description: {
            trim: true,
            isEmpty: {
                errorMessage: 'description cannot be empty',
                negated: true
            }
        },

        startDate: {
            isISO8601: {
                errorMessage: 'Invalid Date format'
            }
        },
        endDate: {
            isISO8601: {
                errorMessage: 'Invalid Date format'
            }
        },
        
        

    }
    return valObj
}