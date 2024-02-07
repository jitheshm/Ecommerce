const express = require('express');
const { signupHandler, otpverifyHandler, loginHandler, getProductHandler, getProductDetailHandler, tokenVerifyHandler, getColorListHandler, resendOtpHandler, addAddressHandler, updateAddressHandler, deleteAddressHandler, getUserAllAddressHandler, fetchAddressHandler } = require('../routeHandlers/userRouteHandler');
const userAuthToken = require('../../middlewares/userAuthToken');
const router = express.Router()

router.post('/signup', signupHandler)

router.post('/otpverify', otpverifyHandler)

router.post('/login', loginHandler)

router.get('/getproducts', getProductHandler)

router.get('/getproductdetails/:color', getProductDetailHandler)

router.get('/tokenverify', userAuthToken, tokenVerifyHandler)

router.get('/getcolorlist/:id', getColorListHandler)

router.get('/resendotp', userAuthToken, resendOtpHandler)

router.post('/newaddress', userAuthToken, addAddressHandler)

router.patch('/updateaddress', userAuthToken, updateAddressHandler)

router.delete('/deleteaddress', userAuthToken, deleteAddressHandler)

router.get('/address', userAuthToken, getUserAllAddressHandler)

router.get('/address/:id', userAuthToken, fetchAddressHandler)



module.exports = router