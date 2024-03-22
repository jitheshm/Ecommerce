const { nodemailerEmail, nodemailerPassword, razorpaykey_id, razorpaykey_secret, client_url } = require('../../config')
const { ObjectId } = require('mongodb');
const { getOneVarientPerProduct, getVarientDetail, getcolorlist, searchProducts, getNewProducts } = require('../../../adapters/controllers/productController');

const { signup, verifyUser, loginUser, resendOtp, changePersonaldata, getPersonalData, forgetPasswordOtp, newPasswordUpdate, userAuthenticate } = require('../../../adapters/controllers/userController');
const { addAddress, updateAddress, deleteAddress, getUserAllAddress, findAddress } = require('../../../adapters/controllers/addressController');
const { addToCart, changeQuantity, removeCartProduct, findCart, checkProductExist, stockAvailable } = require('../../../adapters/controllers/cartController');
const isStockAvailable = require('../../../usecase/cart/isStockAvailable');
const { placeOrder, getOrders, getSpecificOrder, changeStatus, verifyPayment, returnProduct, repay, getOneOrder, topSellingProducts, trendingProducts } = require('../../../adapters/controllers/orderController');
const moment = require('moment');
const { validationResult } = require('express-validator');
const razorpayUtils = require('razorpay/dist/utils/razorpay-utils');
const { getWallet } = require('../../../adapters/controllers/walletController');
const { addToWishlist, checkWishlist, removeFromWishlist, getWishlist } = require('../../../adapters/controllers/wishlistController');
const { getCategory } = require('../../../adapters/controllers/categoryController');
const { applyCoupon, getActiveCoupons } = require('../../../adapters/controllers/couponController');
const { getAvailableOffers } = require('../../../adapters/controllers/offerController');
const getActiveCoupopns = require('../../../usecase/coupon/getActiveCoupons');
const { getInvoice } = require('../../../adapters/controllers/InvoiceController');
const { getDisplayBanners } = require('../../../adapters/controllers/bannerController');





module.exports = {
    signupHandler: async (req, res) => {
        try {
            const result = validationResult(req);
            console.log(result);
            if (result.isEmpty()) {
                const token = await signup(req.body, nodemailerEmail, nodemailerPassword)
                if (token) {
                    res.status(200).json({ success: true, token: token })
                } else {
                    res.status(200).json({ success: false, "error": "user already exist" })
                }
            } else {
                res.status(400).json({ "error": result.array() })
            }


        } catch (error) {
            console.log(error);
            res.status(500).json({ "error": "internal server error" })
        }
    },
    otpverifyHandler: async (req, res) => {
        try {
            const token = req.header('Authorization');
            //userId=new ObjectId(req.body.id)
            const result = await verifyUser(req.body, token)
            if (result) {
                console.log(result);
                res.json({ success: true, token: result.token, name: result.name })
            }
            else {
                res.json({ success: false, "error": "otp is incorrect" })
            }
        } catch (error) {
            console.log("error" + error);
            res.status(500).json({ "error": "internal server error" })
        }
    },
    loginHandler: async (req, res) => {
        try {
            const valResult = validationResult(req);
            if (valResult.isEmpty()) {
                const result = await loginUser(req.body)
                if (result) {
                    res.status(200).json({ success: true, token: result.token, name: result.name })
                } else {
                    res.status(401).json({ error: "email or password is incorrect" })
                }
            } else {
                res.status(400).json({ "error": valResult.array() })
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ "error": "internal server error" })
        }
    },
    getProductHandler: async (req, res) => {
        try {
            const filter = req.query.filter
            const products = await getOneVarientPerProduct(filter)
            res.status(200).json({ success: true, data: products })
        } catch (error) {
            console.log(error);
            res.status(500).json({ "error": "internal server error" })
        }
    },
    getProductDetailHandler: async (req, res) => {
        try {
            const color = req.params.color
            const id = new ObjectId(req.params.id)
            const varientDetails = await getVarientDetail(color, id)
            res.status(200).json({ success: true, data: varientDetails })
        } catch (error) {
            console.log(error);
            res.status(500).json({ "error": "internal server error" })
        }
    },
    tokenVerifyHandler: (req, res) => {
        res.status(200).json({ success: true, name: req.user.name })
    },
    getColorListHandler: async (req, res) => {
        try {
            const id = new ObjectId(req.params.id)
            const result = await getcolorlist(id)
            res.status(200).json({ success: true, data: result })
        } catch (error) {
            console.log(error);
            res.status(500).json({ "error": "internal server error" })
        }
    },
    resendOtpHandler: async (req, res) => {
        try {

            const status = await resendOtp(req.header('Authorization'), nodemailerEmail, nodemailerPassword)
            console.log(status);
            if (status) {
                res.status(200).json({ success: true })
            }
            else {
                res.status(200).json({ success: false, msg: "otp not resent" })
            }

        } catch (error) {
            console.log(error);
            res.status(500).json({ "error": "internal server error" })
        }
    },
    addAddressHandler: async (req, res) => {
        try {
            const result = validationResult(req);
            console.log(result.array());
            if (result.isEmpty()) {
                const status = await addAddress(req.body, req.user.id)
                console.log(status);
                if (status) {
                    res.status(200).json({ success: true })
                }
                else {
                    res.status(200).json({ success: false, msg: "address not added" })
                }
            } else {
                res.status(400).json({ "error": result.array() })
            }
        } catch (error) {

            res.status(500).json({ "error": "internal server error" })
        }
    },
    updateAddressHandler: async (req, res) => {
        try {
            // const id = new ObjectId(req.body.id)
            const result = validationResult(req);
            if (result.isEmpty()) {
                const status = await updateAddress(req.body)
                console.log(status);
                if (status) {
                    res.status(200).json({ success: true })
                }
                else {
                    res.status(200).json({ success: false, msg: "address not updated" })
                }
            } else {
                res.status(400).json({ "error": result.array() })
            }
        } catch (error) {
            console.log(error);

            res.status(500).json({ "error": "internal server error" })
        }
    },
    deleteAddressHandler: async (req, res) => {
        try {
            const status = await deleteAddress(req.query.id)
            console.log(status);
            if (status) {
                res.status(200).json({ success: true })
            }
            else {
                res.status(200).json({ success: false, msg: "address not deleted" })
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ "error": "internal server error" })
        }
    },
    getUserAllAddressHandler: async (req, res) => {
        try {
            const result = await getUserAllAddress(req.user.id)
            res.status(200).json({ success: true, data: result })

        } catch (error) {
            console.log(error);
            res.status(500).json({ "error": "internal server error" })
        }

    },
    fetchAddressHandler: async (req, res) => {
        try {
            const address = await findAddress(req.params.id)
            res.status(200).json({ success: true, data: address })
        } catch (error) {
            console.log(error);
            res.status(500).json({ "error": "internal server error" })
        }
    },
    addToCartHandler: async (req, res) => {
        try {
            const status = await addToCart(req.user.id, new ObjectId(req.body.productId))
            if (status) {
                res.status(200).json({ success: true })
            }
            else {
                res.status(200).json({ success: false, msg: "product not added to cart" })
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ "error": "internal server error" })
        }
    },
    incrementQuantityHandler: async (req, res) => {
        try {
            const { status, msg } = await changeQuantity(new ObjectId(req.user.id), new ObjectId(req.body.productId), 1)
            if (status) {
                res.status(200).json({ success: true, msg: msg })
            }
            else {
                res.status(200).json({ success: false, msg: msg })
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ "error": "internal server error" })
        }
    },
    decrementQuantityHandler: async (req, res) => {
        try {
            const { status, msg } = await changeQuantity(new ObjectId(req.user.id), new ObjectId(req.body.productId), -1)
            if (status) {
                res.status(200).json({ success: true, msg: msg })
            }
            else {
                console.log(msg);
                res.status(200).json({ success: false, msg: msg })
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ "error": "internal server error" })
        }
    },
    removeCartProductHandler: async (req, res) => {
        try {
            const status = await removeCartProduct(req.user.id, new ObjectId(req.body.productId))
            if (status) {
                res.status(200).json({ success: true })
            }
            else {
                res.status(200).json({ success: false, msg: "product not removed" })
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ "error": "internal server error" })
        }
    },
    findCartHandler: async (req, res) => {
        try {
            const cart = await findCart(new ObjectId(req.user.id))
            res.status(200).json({ success: true, data: cart })

        } catch (error) {
            console.log(error);
            res.status(500).json({ "error": "internal server error" })
        }
    },
    checkProductExistHandler: async (req, res) => {
        try {
            const status = await checkProductExist(new ObjectId(req.query.varientId), new ObjectId(req.user.id))
            if (status) {
                res.status(200).json({ success: true })
            } else {
                res.status(200).json({ success: false, msg: "product not found" })
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ "error": "internal server error" })
        }
    },
    checkStockAvailableHandler: async (req, res) => {
        try {
            const status = await stockAvailable(new ObjectId(req.query.varientId), req.query.quantity)
            if (status) {
                res.status(200).json({ success: true })
            } else {
                res.status(200).json({ success: false, msg: "stock not available" })
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ "error": "internal server error" })
        }
    },
    orderPlaceHandler: async (req, res) => {
        try {
            const data = req.body
            data.deliveryDate = moment().add(10, 'days').format('DD-MM-yyyy')
            data.orderDate = moment().toDate()
            const result = await placeOrder(req.user.id, data, razorpaykey_id, razorpaykey_secret)
            console.log(result);
            if (result) {
                res.status(200).json({ success: true, data: result })
            } else {
                res.status(200).json({ success: false, msg: "order place failed" })
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ "error": "internal server error" })
        }
    },
    getOrderHandler: async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const result = await getOrders(new ObjectId(req.user.id), page, limit)
            console.log(result);
            res.status(200).json({ success: true, data: result.orders, totalPages: result.totalPages })
        } catch (error) {
            console.log(error);
            res.status(500).json({ "error": "internal server error" })
        }
    },
    getOrderSpecificHandler: async (req, res) => {
        try {
            const result = await getSpecificOrder(new ObjectId(req.params.id), new ObjectId(req.params.productId))
            if (result) {
                res.status(200).json({ success: true, data: result })
            } else {
                res.status(200).json({ success: false, msg: "order not found" })
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ "error": "internal server error" })
        }
    },
    cancelOrderHandler: async (req, res) => {
        try {

            const status = await changeStatus(new ObjectId(req.params.orderId), new ObjectId(req.user.id), new ObjectId(req.params.productId), "Cancelled")
            if (status) {
                res.status(200).json({ success: true })
            } else {
                res.status(200).json({ success: false, msg: "order not cancelled" })
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ "error": "internal server error" })
        }
    },
    personalDetailsChangeHandler: async (req, res) => {
        try {
            const result = validationResult(req);
            if (result.isEmpty()) {
                const status = await changePersonaldata(new ObjectId(req.user.id), req.body)
                if (status) {
                    res.status(200).json({ success: true })
                } else {
                    res.status(200).json({ success: false, msg: "data not updated" })
                }
            } else {
                res.status(400).json({ "error": result.array() })
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ "error": "internal server error" })
        }
    },
    getPersonalDataHandler: async (req, res) => {
        try {
            const user = await getPersonalData(new ObjectId(req.user.id))
            if (user) {
                res.status(200).json({ success: true, data: user })
            } else {
                res.status(200).json({ success: false, msg: "user  not found" })
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ "error": "internal server error" })
        }

    },
    forgetPasswordOtpHandler: async (req, res) => {
        try {
            const token = await forgetPasswordOtp(nodemailerEmail,
                nodemailerPassword, req.body)
            if (token) {
                res.status(200).json({ success: true, token: token })
            } else {
                res.status(200).json({ success: false, msg: "user  not found" })
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ "error": "internal server error" })
        }
    },
    newPasswordHandler: (req, res) => {
        try {
            const status = newPasswordUpdate(req.header('Authorization'), req.body)
            if (status) {
                res.status(200).json({ success: true })
            } else {
                res.status(200).json({ success: false, msg: "password not update" })
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ "error": "internal server error" })
        }
    },
    searchHandler: async (req, res) => {
        try {

            let { sort, order, page, limit, ...filter } = req.query
            page = parseInt(page) || 1;
            limit = parseInt(limit) || 10;
            const sortObj = {
                [req.query.sort]: Number(req.query.order)
            }
            console.log(filter);
            filter.in
            console.log(req.params.search, sort);
            const result = await searchProducts(req.params.search, sortObj, filter,page,limit)

            console.log(result);
            res.status(200).json({ success: true, data: result.products, totalPages: result.totalPages })
        } catch (error) {
            console.log(error);
            res.status(500).json({ "error": "internal server error" })
        }

    },
    verifyPaymentHandler: async (req, res) => {
        try {

            console.log(req.body);
            req.body.userId = req.user.id
            const result = await verifyPayment(req.body, razorpaykey_secret)
            if (result) {
                res.status(200).json({ success: true, data: result })
            } else {
                res.status(200).json({ success: false, msg: "payment not verified" })
            }

            //const result = validatePaymentVerification(req.body, razorpaykey_secret)


        } catch (err) {
            console.log(err);
            res.status(500).json({ "error": "internal server error" })
        }
    },
    returnProductHandler: async (req, res) => {
        try {



            const status = await returnProduct(new ObjectId(req.params.orderId), new ObjectId(req.user.id), new ObjectId(req.params.productId), req.body.reason)
            if (status) {
                res.status(200).json({ success: true })
            } else {
                res.status(200).json({ success: false, msg: "order not returned" })
            }


        } catch (error) {
            console.log(error.message);
            if (error.statusCode == 400) {
                res.status(400).json({ "error": error.message })
            } else {
                res.status(500).json({ "error": "internal server error" })
            }

        }
    },
    walletHandler: async (req, res) => {
        try {
            const wallet = await getWallet(new ObjectId(req.user.id))
            console.log(wallet);
            res.status(200).json({ success: true, data: wallet })
        } catch (error) {
            console.log(error);
            res.status(500).json({ "error": "internal server error" })
        }
    },
    addWishlistHandler: async (req, res) => {
        try {
            console.log(req.body.productId, req.user.id, "hh");
            const status = await addToWishlist(new ObjectId(req.user.id), new ObjectId(req.body.productId))
            if (status) {
                res.status(200).json({ success: true })
            }
            else {
                res.status(200).json({ success: false, msg: "product not added to wishlist" })
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ "error": "internal server error" })
        }
    },
    removeWishlistHandler: async (req, res) => {
        try {
            console.log(req.body.productId, req.user.id, "hh");
            const status = await removeFromWishlist(new ObjectId(req.user.id), new ObjectId(req.body.productId))
            if (status) {
                res.status(200).json({ success: true })
            }
            else {
                res.status(200).json({ success: false, msg: "product not added to wishlist" })
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ "error": "internal server error" })
        }
    },
    checkWishlistHandler: async (req, res) => {
        try {
            console.log(req.query.productId, req.user.id, "ll");
            const status = await checkWishlist(new ObjectId(req.user.id), new ObjectId(req.query.productId))
            console.log("status", status);
            if (status) {
                res.status(200).json({ success: true })
            }
            else {
                res.status(200).json({ success: false, msg: "product not found in wishlist" })
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ "error": "internal server error" })
        }
    },
    WishlistHandler: async (req, res) => {
        try {
            const wishlist = await getWishlist(new ObjectId(req.user.id))
            res.status(200).json({ success: true, data: wishlist })
        } catch (error) {
            console.log(error);
            res.status(500).json({ "error": "internal server error" })
        }
    },
    fetchCategoryHandler: async (req, res) => {
        try {
            const result = await getCategory()
            res.status(200).json({ success: true, data: result.categories })
        } catch (error) {
            console.log(error);
            res.status(500).json({ "error": "internal server error" })
        }
    },
    applyCouponHandler: async (req, res) => {
        try {
            const coupon = await applyCoupon(req.body, new ObjectId(req.user.id))
            console.log(coupon);
            if (coupon) {
                res.status(200).json({ success: true, data: coupon })
            }
            else {
                res.status(200).json({ success: false, msg: "invalid coupon" })
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ "error": "internal server error" })
        }
    },
    getAvailableOffersHandler: async (req, res) => {
        try {
            const offers = await getAvailableOffers(new ObjectId(req.params.productId), new ObjectId(req.params.categoryId))
            res.status(200).json({ success: true, data: offers })
        } catch (error) {
            console.log(error);
            res.status(500).json({ "error": "internal server error" })
        }
    },
    getActiveCouponsHandler: async (req, res) => {
        try {
            const Coupons = await getActiveCoupons()
            res.status(200).json({ success: true, data: Coupons })
        } catch (error) {
            console.log(error);
            res.status(500).json({ "error": "internal server error" })
        }
    },
    repayHandler: async (req, res) => {
        try {
            const data = req.body
            const result = await repay(data, razorpaykey_id, razorpaykey_secret)
            console.log(result);
            if (result) {
                res.status(200).json({ success: true, data: result })
            } else {
                res.status(200).json({ success: false, msg: "repayment failed" })
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ "error": "internal server error" })
        }
    },
    getOneOrderHandler: async (req, res) => {
        try {
            const orderId = new ObjectId(req.params.orderId)
            const order = await getOneOrder(orderId)
            res.status(200).json({ success: true, data: order })
        } catch (error) {
            console.log(error);
            res.status(500).json({ "error": "internal server error" })
        }

    },
    getInvoiceHandler: async (req, res) => {
        try {
            const orderId = new ObjectId(req.params.orderId)
            const invoice = await getInvoice(orderId)
            res.status(200).json({ success: true, data: invoice })
        } catch (error) {
            console.log(error);
            res.status(500).json({ "error": "internal server error" })
        }
    },
    authenticationHandler: async (req, res) => {
        try {

            const token = await userAuthenticate(req.user)
            console.log(token);
            if (token) {
                res.cookie('token', token);
                res.redirect(`${client_url}`)
                // res.status(200).json({ success: true, token: token })
            } else {
                res.status(200).json({ success: false, "error": "user is blocked" })
            }



        } catch (error) {
            console.log(error);
            res.status(500).json({ "error": "internal server error" })
        }
    },
    getNewProductsHandler: async (req, res) => {
        try {
            const products = await getNewProducts()
            res.status(200).json({ success: true, data: products })

        } catch (error) {

        }
    },
    getTrendingProductsHandler: async (req, res) => {
        try {
            const data = await trendingProducts()
            console.log("selling");
            console.log(data);
            res.status(200).json({ success: true, data: data })
        } catch (error) {
            console.log(error);
            res.status(500).json({ "error": "internal server error" })
        }
    },
    bannerHandler: async (req, res) => {
        try {
            const banners = await getDisplayBanners()
            res.status(200).json({ success: true, data: banners })
        } catch (error) {
            console.log(error);
            res.status(500).json({ "error": "internal server error" })
        }
    }
}