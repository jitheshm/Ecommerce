const express = require('express');
const router = express.Router();
const authToken = require('../../middlewares/adminAuthToken');
const fileUpload = require('../../middlewares/fileUpload');
const {
    loginHandler,
    blockUserHandler,
    unblockUserHandler,
    fetchAllUsersHandler,
    productAddHandler,
    varientUpdateHandler,
    varientAddHandler,
    varientDeleteHandler,
    productUpdateHandler,
    productDeleteHandler,
    addCategoryHandler,
    updateCategoryHandler,
    deleteCategoryHandler,
    getCategoryHandler,
    getSpecificCategoryHandler,
    editProductHandler,
    getAllProductsHandler,
    tokenVerifyHandler,
    editVarientHandler,
    productListChangeHandler,
    viewProductHandler,
    getProductAllVarientHandler,
    ordersListHandler,
    orderStatusHandler,
    returnordersListHandler,
    orderReturnStatusHandler,
    addCouponHandler,
    getCouponHandler,
    updateCouponHandler,
    getallCouponHandler,
    handleDeleteCouponHandler,
    addOfferHandler,
    getallOffersHandler,
    getOfferHandler,
    updateOfferHandler,
    handleDeleteOfferHandler,
    salesReportHandler,
    getOrderSpecificHandler,
    salesOverviewHandler,
    topSellingProductsHandler,
    topSellingCategoriesHandler,
    topSellingBrandsHandler,
    addBannerHandler,
    updateBannerHandler,
    bannerStatusHandler,
    getAllBannerHandler,
    getBannerHandler,
    getDisplayBannersHandler
} = require('../routeHandlers/adminRouteHandler');
const { checkSchema } = require('express-validator');
const loginValidator = require('../validators/admin/loginValidator');
const productValidator = require('../validators/admin/productValidator');
const categoryValidator = require('../validators/admin/categoryValidator');
const varientValidator = require('../validators/admin/varientValidator');
const couponValidator = require('../validators/admin/couponValidator');
const bannerValidator = require('../validators/admin/bannerValidator');


// Admin Authentication
router.post('/login', checkSchema(loginValidator()), loginHandler);
router.get('/tokenverify', authToken, tokenVerifyHandler)

// Users
router.get('/users', authToken, fetchAllUsersHandler);
router.patch('/users/:id/block', authToken, blockUserHandler);
router.patch('/users/:id/unblock', authToken, unblockUserHandler);

// Products
router.get('/products', authToken, getAllProductsHandler)
router.post('/products', authToken, checkSchema(productValidator()), productAddHandler)
router.get('/products/:id', authToken, viewProductHandler)
router.patch('/products', authToken, checkSchema(productValidator()), productUpdateHandler)
router.delete('/products/:id', authToken, productDeleteHandler)
router.get('/products/:id/edit', authToken, editProductHandler)
router.patch('/products/:id/list', authToken, productListChangeHandler)

// Categories
router.post('/categories', authToken, fileUpload("categories"), checkSchema(categoryValidator()), addCategoryHandler)
router.get('/categories', authToken, getCategoryHandler)
router.get('/categories/:id', authToken, getSpecificCategoryHandler)
router.patch('/categories', authToken, fileUpload("categories"), checkSchema(categoryValidator()), updateCategoryHandler)
router.delete('/categories/:id', authToken, deleteCategoryHandler)

// Variants
router.post('/products/variants', authToken, fileUpload("products"), checkSchema(varientValidator()), varientAddHandler)
router.patch('/products/variants', authToken, fileUpload("products"), checkSchema(varientValidator()), varientUpdateHandler)
router.delete('/products/variants/:variantId', authToken, varientDeleteHandler)
router.get('/products/variants/:variantId/edit', authToken, editVarientHandler)
router.get('/products/variants/:proId', authToken, getProductAllVarientHandler)

// Orders
router.get('/orders', authToken, ordersListHandler)
router.get('/orders/:id/:productId', authToken, getOrderSpecificHandler)
router.get('/orders/return', authToken, returnordersListHandler)
router.patch('/orders/:orderId/return', authToken, orderReturnStatusHandler)
router.patch('/orders/:userId/:orderId/:productId/status', authToken, orderStatusHandler)

// Coupons
router.post('/coupons', authToken, checkSchema(couponValidator()), addCouponHandler)
router.get('/coupons', authToken, getallCouponHandler)
router.patch('/coupons/:id', authToken, checkSchema(couponValidator()), updateCouponHandler)
router.get('/coupons/:id', authToken, getCouponHandler)
router.delete('/coupons/:id', authToken, handleDeleteCouponHandler)

// Offers
router.post('/offers', authToken, addOfferHandler)
router.get('/offers', authToken, getallOffersHandler)
router.get('/offers/:id', authToken, getOfferHandler)
router.patch('/offers/:id', authToken, updateOfferHandler)
router.delete('/offers/:id', authToken, handleDeleteOfferHandler)

// Sales
router.get('/sales/report/:startDate/:endDate', authToken, salesReportHandler)
router.get('/sales/overview/:filter', authToken, salesOverviewHandler)
router.get('/sales/topsellingproducts', authToken, topSellingProductsHandler)
router.get('/sales/topsellingcategories', authToken, topSellingCategoriesHandler)
router.get('/sales/topsellingBrands', authToken, topSellingBrandsHandler)

// Banners
router.post('/banners', authToken, fileUpload("banners"), checkSchema(bannerValidator()), addBannerHandler)
router.patch('/banners/:id', authToken, fileUpload("banners"), checkSchema(bannerValidator()), updateBannerHandler)
router.patch('/banners/:id/status', authToken, bannerStatusHandler)
router.get('/banners', authToken, getAllBannerHandler)
router.get('/banners/:id', authToken, getBannerHandler)











































module.exports = router