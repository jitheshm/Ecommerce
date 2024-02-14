const express = require('express')
const router = express.Router()
const authToken = require('../../middlewares/adminAuthToken');
const fileUpload = require('../../middlewares/fileUpload');
const { loginHandler, blockUserHandler, unblockUserHandler, fetchAllUsersHandler, productAddHandler, varientUpdateHandler, varientAddHandler, varientDeleteHandler, productUpdateHandler, productDeleteHandler, addCategoryHandler, updateCategoryHandler, deleteCategoryHandler, getCategoryHandler, getSpecificCategoryHandler, editProductHandler, getAllProductsHandler, tokenVerifyHandler, editVarientHandler, productListChangeHandler, viewProductHandler, getProductAllVarientHandler, ordersListHandler, orderStatusHandler } = require('../routeHandlers/adminRouteHandler');


//admin routes


router.post('/login', loginHandler)

router.get('/blockuser', authToken, blockUserHandler)

router.get('/unblockuser', authToken, unblockUserHandler)

router.get('/getusers', authToken, fetchAllUsersHandler)

router.post('/addproduct', authToken, productAddHandler)

router.post('/addvarient', authToken, fileUpload("products"), varientAddHandler)

router.patch('/updatevarient', authToken, fileUpload("products"), varientUpdateHandler)

router.delete('/deletevarient', authToken, varientDeleteHandler)


router.patch('/updateproduct', authToken, productUpdateHandler)

router.delete('/deleteproduct', authToken, productDeleteHandler)

router.post('/addcategory', authToken, addCategoryHandler)

router.patch('/updateCategory', authToken, updateCategoryHandler)

router.delete('/deleteCategory', authToken, deleteCategoryHandler)


router.get('/getcategories', authToken, getCategoryHandler)

router.get('/getcategory/:id', authToken, getSpecificCategoryHandler)

router.get('/editProduct/:id', authToken, editProductHandler)

router.get('/products', authToken, getAllProductsHandler)
router.get('/tokenverify', authToken, tokenVerifyHandler)


router.get('/editvarient/:id', authToken, editVarientHandler)


router.patch('/changelistproduct',authToken, productListChangeHandler)

router.get('/product/:id',authToken, viewProductHandler)

router.get('/getallvarient/:proId',authToken, getProductAllVarientHandler)

router.get('/orders',authToken, ordersListHandler)

router.patch('/changeorderstatus',authToken, orderStatusHandler)
module.exports = router