const Cart = require("../../entity/cartEntity")
const CartModel = require("../models/cartModel")

module.exports = {
    addToCart: async (userId, productId) => {

        try {

            const existCart = await CartModel.findOne({ userId: userId })
            const data = new Cart(userId, productId)
            if (!existCart) {

                const cart = new CartModel(data)
                await cart.save()
                return true
            }
            else {

                if (existCart.products.find(product => productId.equals(product.productId))) {
                    return false
                }
                console.log(productId);
                const result = await CartModel.updateOne({ userId: userId }, {
                    $push: {
                        products: data.products[0]
                    }
                })
                console.log(result);
                if (result.modifiedCount != 0)
                    return true
                else
                    return false
            }


            // const existCart = await CartModel.findOne({ userId: userId })
            // if (existCart && existCart.products.find(product => product.productId === data.productId)) {
            //     return false
            // }
            // if (existCart) {
            //     var cart = Cart(existCart.userId, existCart.products)
            //     cart.addProduct(data)

            // } else {
            //     var cart = Cart(userId, [data])
            // }

            // const res = await CartModel.updateOne({ userId: cart.userId }, { products: cart.products }, {
            //     upsert: true

            // })
            // console.log(res);
            // return true
            // const result=await CartModel.updateOne({userId:userId},{$push:{products:data}},{
            //     upsert:true
            // })
        } catch (error) {
            console.log(error);
            throw error
        }

    },
    changeQuantity: async (userId, productId, quantity, stockCount) => {
        try {
            console.log(userId, productId, quantity, stockCount);
            const cart = await CartModel.aggregate([
                { $match: { userId: userId } },
                { $unwind: "$products" },
                { $match: { "products.productId": productId } },
                { $project: { quantity: "$products.quantity" } }
            ])
            console.log(cart);
            if (cart[0].quantity + quantity > stockCount && quantity > 0 || cart[0].quantity + quantity < 1) {
                return false
            }

            const res = await CartModel.updateOne({ userId: userId }, {
                $inc: { "products.$[elem].quantity": quantity }
            },
                { arrayFilters: [{ "elem.productId": productId }] })
            if (res.modifiedCount != 0) {
                return true
            }
            else {
                return false
            }
        } catch (error) {
            console.log(error);
            throw error
        }
    },
    removeCartProduct: async (userId, productId) => {
        try {
            const res = await CartModel.updateOne({ userId: userId }, {
                $pull: { products: { productId: productId } }

            })
            console.log(res);
            if (res.modifiedCount != 0) {
                return true
            }
            else {
                return false
            }
        } catch (error) {
            console.log(error);
            throw error
        }

    }

}