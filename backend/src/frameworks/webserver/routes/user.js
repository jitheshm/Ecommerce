const express = require('express');
const { signupHandler, otpverifyHandler, loginHandler, getProductHandler, getProductDetailHandler, tokenVerifyHandler, getColorListHandler, resendOtpHandler, addAddressHandler, updateAddressHandler, deleteAddressHandler, getUserAllAddressHandler, fetchAddressHandler, addToCartHandler, incrementQuantityHandler, decrementQuantityHandler, removeCartProductHandler, findCartHandler, checkProductExistHandler, checkStockAvailableHandler, orderPlaceHandler, getOrderHandler, getOrderSpecificHandler, cancelOrderHandler, personalDetailsChangeHandler, getPersonalDataHandler, forgetPasswordOtpHandler, newPasswordHandler, searchHandler, verifyPaymentHandler, returnProductHandler, walletHandler, checkWishlistHandler, addWishlistHandler, removeWishlistHandler, WishlistHandler, fetchCategoryHandler, applyCouponHandler, getAvailableOffersHandler, getActiveCouponsHandler, repayHandler, getOneOrderHandler, getInvoiceHandler } = require('../routeHandlers/userRouteHandler');
const userAuthToken = require('../../middlewares/userAuthToken');
const { checkSchema, checkExact } = require('express-validator');
const signupValidator = require('../validators/user/signupValidator');
const loginValidator = require('../validators/user/loginValidator');
const addressValidator = require('../validators/user/addressValidator');
const profileValidator = require('../validators/user/profileValidator');

const router = express.Router()

router.post('/signup', checkSchema(signupValidator()), signupHandler)

router.post('/otpverify', otpverifyHandler)

router.post('/login', checkSchema(loginValidator()), loginHandler)

router.get('/getproducts', getProductHandler)

router.get('/getproductdetails/:id/:color', getProductDetailHandler)

router.get('/tokenverify', userAuthToken, tokenVerifyHandler)

router.get('/getcolorlist/:id', getColorListHandler)

router.get('/resendotp', resendOtpHandler)

router.post('/newaddress', userAuthToken, checkSchema(addressValidator()), addAddressHandler)

router.patch('/updateaddress', userAuthToken, checkSchema(addressValidator()), updateAddressHandler)

router.delete('/deleteaddress', userAuthToken, deleteAddressHandler)

router.get('/address', userAuthToken, getUserAllAddressHandler)

router.get('/address/:id', userAuthToken, fetchAddressHandler)

router.patch('/addtocart', userAuthToken, addToCartHandler)

router.patch('/incrementquantity', userAuthToken, incrementQuantityHandler)

router.patch('/decrementquantity', userAuthToken, decrementQuantityHandler)

router.patch('/deletefromcart', userAuthToken, removeCartProductHandler)

router.get('/cart', userAuthToken, findCartHandler)

router.get('/checkproductexist', userAuthToken, checkProductExistHandler)

router.get('/checkstockavailable', userAuthToken, checkStockAvailableHandler)

router.post('/placeorder', userAuthToken, orderPlaceHandler)

router.get('/order', userAuthToken, getOrderHandler)

router.get('/order/:id/:productId', userAuthToken, getOrderSpecificHandler)

router.patch('/cancelorder/:orderId/:productId', userAuthToken, cancelOrderHandler)

router.patch('/personal', userAuthToken, checkExact(checkSchema(profileValidator())), personalDetailsChangeHandler)

router.get('/personaldetails', userAuthToken, getPersonalDataHandler)

router.post('/forgetotpsend', forgetPasswordOtpHandler)
router.patch('/passwordupdate', newPasswordHandler)

router.get('/product/search/:search', searchHandler)

router.patch('/verifypayment', userAuthToken, verifyPaymentHandler)
router.patch('/returnproduct/:orderId/:productId', userAuthToken, returnProductHandler)

router.get('/wallet', userAuthToken, walletHandler)
router.patch('/addtowishlist', userAuthToken, addWishlistHandler)
router.patch('/removefromwishlist', userAuthToken, removeWishlistHandler)
router.get('/checkwishlist', userAuthToken, checkWishlistHandler)
router.get('/wishlist', userAuthToken, WishlistHandler)
router.get('/categories', fetchCategoryHandler)
router.post('/applycoupon', userAuthToken, applyCouponHandler)
router.get('/coupons', userAuthToken, getActiveCouponsHandler)

router.get('/availableoffers/:categoryId/:productId', getAvailableOffersHandler)

router.post('/orderrepayment', userAuthToken, repayHandler)

router.get('/getoneorder/:orderId', userAuthToken, getOneOrderHandler)
router.get('/invoice/:orderId', userAuthToken, getInvoiceHandler)



module.exports = router