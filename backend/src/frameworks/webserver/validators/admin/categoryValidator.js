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
       

    }
    return valObj
}