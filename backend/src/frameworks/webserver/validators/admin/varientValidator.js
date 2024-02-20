const { ObjectId } = require('mongodb')
module.exports = () => {
    const valObj = {

        productId: {
            trim: true,
            optional: true,
            isEmpty: {
                errorMessage: 'Product ID cannot be empty',
                negated: true
            },
            customSanitizer: {
                options: value => new ObjectId(value)
            },
        },
        id: {
            trim: true,
            optional: true,
            isEmpty: {
                errorMessage: 'varient ID cannot be empty',
                negated: true
            },
            customSanitizer: {
                options: value => new ObjectId(value)
            },
        },


        custom: {
            options: (value, { req }) => {
                if (!req.body.productId && !req.body.id) {
                    throw new Error('Either productId or id is required')
                }
                return true
            }
        },
        color: {
            trim: true,
            isEmpty: {
                errorMessage: 'Color cannot be empty',
                negated: true
            },
            matches: {
                errorMessage: 'color minimum length should be 3',
                options: /^[^\s]{3}/
            }
        },
        stock: {
            isInt: {
                errorMessage: 'Stock should be a valid integer'
            }
        },
        salePrice: {
            isFloat: {
                errorMessage: 'Sale price should be a valid number'
            }
        },
        actualPrice: {
            isFloat: {
                errorMessage: 'Actual price should be a valid number'
            }
        },
        avgRating: {
            optional: true,
            isFloat: {
                errorMessage: 'Average rating should be a valid number'
            }
        },
        reviewCount: {
            optional: true,
            isInt: {
                errorMessage: 'Review count should be a valid integer'
            }
        }

    }
    return valObj
}