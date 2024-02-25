const express = require('express')
const router = express.Router()
const authToken = require('../../middlewares/adminAuthToken');
const fileUpload = require('../../middlewares/fileUpload');
const { loginHandler, blockUserHandler, unblockUserHandler, fetchAllUsersHandler, productAddHandler, varientUpdateHandler, varientAddHandler, varientDeleteHandler, productUpdateHandler, productDeleteHandler, addCategoryHandler, updateCategoryHandler, deleteCategoryHandler, getCategoryHandler, getSpecificCategoryHandler, editProductHandler, getAllProductsHandler, tokenVerifyHandler, editVarientHandler, productListChangeHandler, viewProductHandler, getProductAllVarientHandler, ordersListHandler, orderStatusHandler, returnordersListHandler, orderReturnStatusHandler, addCouponHandler } = require('../routeHandlers/adminRouteHandler');
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

router.post('/addvarient', authToken,  fileUpload("products"),checkSchema(varientValidator()), varientAddHandler)

router.patch('/updatevarient', authToken, fileUpload("products"),checkSchema(varientValidator()), varientUpdateHandler)

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


router.patch('/changelistproduct', productListChangeHandler)

router.get('/product/:id', viewProductHandler)

router.get('/getallvarient/:proId', getProductAllVarientHandler)

router.get('/orders', authToken, ordersListHandler)
router.get('/returnorders', authToken, returnordersListHandler)

router.patch('/changeorderstatus', authToken, orderStatusHandler)
router.patch('/changereturnstatus', authToken, orderReturnStatusHandler)

router.post('/addcoupon',authToken,checkSchema(couponValidator()),addCouponHandler)

module.exports = router