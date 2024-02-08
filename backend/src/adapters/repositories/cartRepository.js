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
                
                if (existCart.products.find(product =>productId.equals(product.productId))) {
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

    }
}