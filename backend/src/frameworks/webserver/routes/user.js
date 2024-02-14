const express = require('express');
const { signupHandler, otpverifyHandler, loginHandler, getProductHandler, getProductDetailHandler, tokenVerifyHandler, getColorListHandler, resendOtpHandler, addAddressHandler, updateAddressHandler, deleteAddressHandler, getUserAllAddressHandler, fetchAddressHandler, addToCartHandler, incrementQuantityHandler, decrementQuantityHandler, removeCartProductHandler, findCartHandler, checkProductExistHandler, checkStockAvailableHandler, orderPlaceHandler, getOrderHandler, getOrderSpecificHandler, cancelOrderHandler, personalDetailsChangeHandler, getPersonalDataHandler, forgetPasswordOtpHandler, newPasswordHandler, searchHandler } = require('../routeHandlers/userRouteHandler');
const userAuthToken = require('../../middlewares/userAuthToken');
const router = express.Router()

router.post('/signup', signupHandler)

router.post('/otpverify', otpverifyHandler)

router.post('/login', loginHandler)

router.get('/getproducts', getProductHandler)

router.get('/getproductdetails/:id/:color', getProductDetailHandler)

router.get('/tokenverify', userAuthToken, tokenVerifyHandler)

router.get('/getcolorlist/:id', getColorListHandler)

router.get('/resendotp', resendOtpHandler)

router.post('/newaddress', userAuthToken, addAddressHandler)

router.patch('/updateaddress', userAuthToken, updateAddressHandler)

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

router.get('/order/:id', userAuthToken, getOrderSpecificHandler)

router.patch('/cancelorder/:orderId', userAuthToken, cancelOrderHandler)

router.patch('/personal', userAuthToken, personalDetailsChangeHandler)

router.get('/personaldetails', userAuthToken, getPersonalDataHandler)

router.post('/forgetotpsend', forgetPasswordOtpHandler)
router.patch('/passwordupdate', newPasswordHandler)

router.get('/product/search/:search',searchHandler)


module.exports = router