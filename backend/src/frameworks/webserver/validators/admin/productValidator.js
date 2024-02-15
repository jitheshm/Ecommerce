const { ObjectId } = require('mongodb')
module.exports = () => {
    const valObj = {

        productName: {
            trim: true,
            isEmpty: {
                errorMessage: 'Product name cannot be empty',
                negated: true
            },
            matches: {
                errorMessage: 'Invalid Product name format',
                options: /^[^\s]{3}/
            }
        },
        brand: {
            trim: true,
            isEmpty: {
                errorMessage: 'Brand cannot be empty',
                negated: true
            }
        },
        categoryId: {
            trim: true,
            isEmpty: {
                errorMessage: 'Category ID cannot be empty',
                negated: true
            },
            customSanitizer: {
                options: value => new ObjectId(value)
            },
        },
        aboutProduct: {
            trim: true,
            isEmpty: {
                errorMessage: 'About product cannot be empty',
                negated: true
            }
        },
        warranty: {
            isInt: {
                errorMessage: 'Warranty should be a valid integer'
            }
        }

    }
    return valObj
}