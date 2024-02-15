module.exports = () => {
    const valObj = {

        category: {
            trim: true,
            isEmpty: {
                errorMessage: 'Category cannot be empty',
                negated: true
            },
            matches: {
                errorMessage: 'Invalid Category format',
                options: /^[^\s]{3}/
            }
        },
        offers: {
            optional: true,
            isArray: {
                errorMessage: 'Offers should be an array'
            }
        }

    }
    return valObj
}