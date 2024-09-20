const express = require('express');
const router = express.Router();
const passport = require('../../middlewares/passport');
const userAuthToken = require('../../middlewares/userAuthToken');
const { checkSchema } = require('express-validator');
const {
  signupHandler,
  otpverifyHandler,
  loginHandler,
  authenticationHandler,
  getProductHandler,
  getProductDetailHandler,
  tokenVerifyHandler,
  getColorListHandler,
  resendOtpHandler,
  addAddressHandler,
  updateAddressHandler,
  deleteAddressHandler,
  getUserAllAddressHandler,
  fetchAddressHandler,
  addToCartHandler,
  incrementQuantityHandler,
  decrementQuantityHandler,
  removeCartProductHandler,
  findCartHandler,
  checkProductExistHandler,
  checkStockAvailableHandler,
  orderPlaceHandler,
  getOrderHandler,
  getOrderSpecificHandler,
  cancelOrderHandler,
  personalDetailsChangeHandler,
  getPersonalDataHandler,
  forgetPasswordOtpHandler,
  newPasswordHandler,
  searchHandler,
  verifyPaymentHandler,
  returnProductHandler,
  walletHandler,
  addWishlistHandler,
  removeWishlistHandler,
  checkWishlistHandler,
  WishlistHandler,
  fetchCategoryHandler,
  applyCouponHandler,
  getAvailableOffersHandler,
  getActiveCouponsHandler,
  repayHandler,
  getOneOrderHandler,
  getInvoiceHandler,
  getNewProductsHandler,
  getTrendingProductsHandler,
  bannerHandler
} = require('../routeHandlers/userRouteHandler');
const signupValidator = require('../validators/user/signupValidator');
const loginValidator = require('../validators/user/loginValidator');
const addressValidator = require('../validators/user/addressValidator');
const profileValidator = require('../validators/user/profileValidator');
const { client_url } = require('../../config');



// Authentication Routes
router.post('/signup', checkSchema(signupValidator()), signupHandler);
router.post('/otpverify', otpverifyHandler);
router.post('/login', checkSchema(loginValidator()), loginHandler);
router.get('/tokenverify', userAuthToken, tokenVerifyHandler)
router.get('/resendotp', resendOtpHandler)


// OAuth Routes
router.get('/auth/google', passport.authenticate('google', { session: false, scope: ['profile', 'email'] }),);
router.get('/auth/google/callback', passport.authenticate('google', { session: false, failureRedirect: `${client_url}` }), authenticationHandler);

router.get('/auth/facebook', passport.authenticate('facebook', { session: false }),);

router.get('/auth/facebook/callback', passport.authenticate('facebook', { session: false, failureRedirect: `${client_url}` }), authenticationHandler);

// Product Routes
router.get('/products', getProductHandler);
router.get('/products/:id/colors', getColorListHandler);
router.get('/products/:id/color/:color', getProductDetailHandler);
router.get('/products/search/:search', searchHandler)
router.get('/products/varients/:varientId/exist', userAuthToken, checkProductExistHandler)
router.get('/products/trending', getTrendingProductsHandler)
router.get('/products/latest', getNewProductsHandler)
router.get('/checkstockavailable', userAuthToken, checkStockAvailableHandler)


// Cart Routes
router.get('/cart', userAuthToken, findCartHandler);
router.patch('/cart', userAuthToken, addToCartHandler);
router.patch('/cart/:productId/increment', userAuthToken, incrementQuantityHandler);
router.patch('/cart/:productId/decrement', userAuthToken, decrementQuantityHandler);
router.delete('/cart/:productId', userAuthToken, removeCartProductHandler);

// Order Routes
router.post('/orders', userAuthToken, orderPlaceHandler);
router.get('/orders', userAuthToken, getOrderHandler);
router.get('/orders/:orderId/products/:productId', userAuthToken, getOrderSpecificHandler);
router.patch('/orders/:orderId/products/:productId/cancel', userAuthToken, cancelOrderHandler);
router.patch('/orders/:orderId/products/:productId/return', userAuthToken, returnProductHandler);
router.get('/orders/:orderId', userAuthToken, getOneOrderHandler)

// Address Routes
router.post('/addresses', userAuthToken, checkSchema(addressValidator()), addAddressHandler);
router.get('/addresses', userAuthToken, getUserAllAddressHandler);
router.get('/addresses/:id', userAuthToken, fetchAddressHandler);
router.patch('/addresses', userAuthToken, checkSchema(addressValidator()), updateAddressHandler);
router.delete('/addresses/:id', userAuthToken, deleteAddressHandler);

// User Routes
router.patch('/profile', userAuthToken, checkSchema(profileValidator()), personalDetailsChangeHandler);
router.get('/profile', userAuthToken, getPersonalDataHandler);
router.post('/forget-password', forgetPasswordOtpHandler);
router.patch('/reset-password', newPasswordHandler);


// Wishlist Routes
router.patch('/wishlist/:productId/add', userAuthToken, addWishlistHandler);
router.delete('/wishlist/:productId/remove', userAuthToken, removeWishlistHandler);
router.get('/wishlist', userAuthToken, WishlistHandler);
router.get('/wishlist/:productId/check', userAuthToken, checkWishlistHandler);


// Coupon Routes
router.post('/coupons/apply', userAuthToken, applyCouponHandler);
router.get('/coupons', userAuthToken, getActiveCouponsHandler)

//payment route
router.patch('/payment/verify', userAuthToken, verifyPaymentHandler)
router.post('/payment/repayment', userAuthToken, repayHandler)

//offers
router.get('/offers/:categoryId/:productId', getAvailableOffersHandler)

//banners
router.get('/banners',bannerHandler)

//invoice
router.get('/invoice/:orderId', userAuthToken, getInvoiceHandler)

//categories
router.get('/categories', fetchCategoryHandler)

//wallet
router.get('/wallet', userAuthToken, walletHandler)

































































module.exports = router