module.exports = () => {
    const valObj = {

        couponId: {
            trim: true,
            isEmpty: {
                errorMessage: 'CouponId cannot be empty',
                negated: true
            }

        },
        expireDate: {
            isISO8601: {
                errorMessage: 'Invalid Date format'
            }
        },
        maxUsers: {
            isInt: {
                errorMessage: 'Invalid maxUsers format'
            }
        },
        discountType: {
            trim: true,
            isEmpty: {
                errorMessage: 'DiscountType cannot be empty',
                negated: true
            }

        },
        discount: {
            isInt: {
                errorMessage: 'Invalid discount format'
            }
        },
        minPurchase: {
            isInt: {
                errorMessage: 'Invalid minPurchase format'
            }
        },
        description: {
            trim: true,
            isEmpty: {
                errorMessage: 'Description cannot be empty',
                negated: true
            },
            matches: {
                errorMessage: 'Invalid Category format',
                options: /^[^\s]{3}/
            }

        }

    }
    return valObj
}