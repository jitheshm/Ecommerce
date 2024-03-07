const express = require('express')
const router = express.Router()
const authToken = require('../../middlewares/adminAuthToken');
const fileUpload = require('../../middlewares/fileUpload');
const { loginHandler, blockUserHandler, unblockUserHandler, fetchAllUsersHandler, productAddHandler, varientUpdateHandler, varientAddHandler, varientDeleteHandler, productUpdateHandler, productDeleteHandler, addCategoryHandler, updateCategoryHandler, deleteCategoryHandler, getCategoryHandler, getSpecificCategoryHandler, editProductHandler, getAllProductsHandler, tokenVerifyHandler, editVarientHandler, productListChangeHandler, viewProductHandler, getProductAllVarientHandler, ordersListHandler, orderStatusHandler, returnordersListHandler, orderReturnStatusHandler, addCouponHandler, getCouponHandler, updateCouponHandler, getallCouponHandler, handleDeleteCouponHandler, addOfferHandler, getallOffersHandler, getOfferHandler, updateOfferHandler, handleDeleteOfferHandler, salesReportHandler, getOrderSpecificHandler, salesOverviewHandler, topSellingProductsHandler } = require('../routeHandlers/adminRouteHandler');
const { checkSchema } = require('express-validator');
const loginValidator = require('../validators/admin/loginValidator');
const productValidator = require('../validators/admin/productValidator');
const categoryValidator = require('../validators/admin/categoryValidator');
const varientValidator = require('../validators/admin/varientValidator');
const couponValidator = require('../validators/admin/couponValidator');


//admin routes


router.post('/login', checkSchema(loginValidator()), loginHandler)

router.get('/blockuser', authToken, blockUserHandler)

router.get('/unblockuser', authToken, unblockUserHandler)

router.get('/getusers', authToken, fetchAllUsersHandler)

router.post('/addproduct', authToken, checkSchema(productValidator()), productAddHandler)

router.post('/addvarient', authToken, fileUpload("products"), checkSchema(varientValidator()), varientAddHandler)

router.patch('/updatevarient', authToken, fileUpload("products"), checkSchema(varientValidator()), varientUpdateHandler)

router.delete('/deletevarient', authToken, varientDeleteHandler)


router.patch('/updateproduct', authToken, checkSchema(productValidator()), productUpdateHandler)

router.delete('/deleteproduct', authToken, productDeleteHandler)

router.post('/addcategory', authToken, checkSchema(categoryValidator()), addCategoryHandler)

router.patch('/updateCategory', authToken, checkSchema(categoryValidator()), updateCategoryHandler)

router.delete('/deleteCategory', authToken, deleteCategoryHandler)


router.get('/getcategories', authToken, getCategoryHandler)

router.get('/getcategory/:id', authToken, getSpecificCategoryHandler)

router.get('/editProduct/:id', authToken, editProductHandler)

router.get('/products', authToken, getAllProductsHandler)
router.get('/tokenverify', authToken, tokenVerifyHandler)


router.get('/editvarient/:id', authToken, editVarientHandler)


router.patch('/changelistproduct', authToken, productListChangeHandler)

router.get('/product/:id', authToken, viewProductHandler)

router.get('/getallvarient/:proId', authToken, getProductAllVarientHandler)

router.get('/orders', authToken, ordersListHandler)
router.get('/order/:id/:productId', authToken, getOrderSpecificHandler)
router.get('/returnorders', authToken, returnordersListHandler)

router.patch('/changeorderstatus', authToken, orderStatusHandler)
router.patch('/changereturnstatus', authToken, orderReturnStatusHandler)

router.post('/addcoupon', authToken, checkSchema(couponValidator()), addCouponHandler)
router.get('/getcoupon/:id', authToken, getCouponHandler)
router.patch('/updatecoupon', authToken, checkSchema(couponValidator()), updateCouponHandler)
router.get('/getallcoupons', authToken, getallCouponHandler)
router.delete(`/deletecoupon/:id`, authToken, handleDeleteCouponHandler)


router.post('/addoffer', authToken, addOfferHandler)
router.get('/getalloffers', authToken, getallOffersHandler)
router.get('/getoffer/:id', authToken, getOfferHandler)
router.patch('/updateoffer', authToken, updateOfferHandler)
router.delete(`/deleteoffer/:id`, authToken, handleDeleteOfferHandler)

router.get('/salesreport/:startDate/:endDate', authToken, salesReportHandler)
router.get('/sales-overview/:filter', authToken, salesOverviewHandler)
router.get('/topsellingproducts', authToken, topSellingProductsHandler)


module.exports = router