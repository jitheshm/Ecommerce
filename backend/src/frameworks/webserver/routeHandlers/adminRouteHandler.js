const { ObjectId } = require('mongodb');
const { login, blockUser, unblockUser, fetchAllUsers } = require('../../../adapters/controllers/adminController')

const { productAdd, varientAdd, varientUpdate, varientDelete, productUpdate, allVarientDelete, productDelete, editProduct, getAllProducts, getVarient, productListChange, viewProduct, getProductAllVarient } = require('../../../adapters/controllers/productController');

const path = require('path');
const fs = require('fs');
const { categoryAdd, categoryUpdate, categoryDelete, getCategory, getSpecificCategory } = require('../../../adapters/controllers/categoryController');
const { ordersList, changeStatus, returnOrdersList, changeReturnStatus, generateSalesReport, getSpecificOrder, salesOverview } = require('../../../adapters/controllers/orderController');
const { validationResult } = require('express-validator');
const { addCoupon, getCoupon, updateCoupon, getAllCoupon, deleteCoupon } = require('../../../adapters/controllers/couponController');
const { addOffer, getAllOffers, getOffer, updateOffer, deleteOffer } = require('../../../adapters/controllers/offerController');

module.exports = {
    loginHandler: async (req, res) => {
        try {
            const valResult = validationResult(req);
            if (valResult.isEmpty()) {
                const token = await login(req.body)
                if (token) {
                    res.status(200).json({ success: true, token: token })
                } else {
                    res.status(401).json({ error: "email or password is incorrect" })
                }
            } else {
                res.status(400).json({ error: valResult.array() })
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ "error": "internal server error" })
        }
    },
    blockUserHandler: async (req, res) => {
        try {
            const userId = new ObjectId(req.query.id)
            console.log(req.query);
            const status = await blockUser(userId)
            if (status) {
                res.status(200).json({ success: true })
            } else {
                res.status(200).json({ success: false, msg: "user not found" })
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ "error": "internal server error" })
        }

    },
    unblockUserHandler: async (req, res) => {
        try {
            const userId = new ObjectId(req.query.id)
            console.log(req.query);
            const status = await unblockUser(userId)
            if (status) {
                res.status(200).json({ success: true })
            } else {
                res.status(200).json({ success: false, msg: "user not found" })
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ "error": "internal server error" })
        }

    },
    fetchAllUsersHandler: async (req, res) => {
        try {
            const users = await fetchAllUsers()
            res.status(200).json({ success: true, data: users })
        } catch (error) {
            console.log(error);
            res.status(500).json({ "error": "internal server error" })
        }
    },
    productAddHandler: async (req, res) => {
        try {
            // req.body.categoryId = new ObjectId(req.body.categoryId)
            const valResult = validationResult(req);
            if (valResult.isEmpty()) {
                const proId = await productAdd(req.body)
                res.status(200).json({ success: true })
            } else {
                res.status(400).json({ error: valResult.array() })
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ "error": "internal server error" })
        }
    },
    varientAddHandler: async (req, res) => {

        try {
            const valResult = validationResult(req);
            if (valResult.isEmpty()) {
                if (req.files) {
                    const imagesUrl = req.files.map((data) => {
                        return data.path
                    })
                    req.body.imagesUrl = imagesUrl
                }
                //req.body.productId =new ObjectId(req.body.productId)
                const proVId = await varientAdd(req.body)
                res.status(200).json({ success: true })
            } else {
                res.status(400).json({ error: valResult.array() })
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ "error": "internal server error" })
        }


    },
    varientUpdateHandler: async (req, res) => {
        try {
            const valResult = validationResult(req);
            if (valResult.isEmpty()) {
                if (req.files) {
                    const imagesUrl = req.files.map((data) => {
                        return data.path
                    })
                    req.body.imagesUrl = imagesUrl

                }
                console.log(req.body);
                if (req.body.oldImageUrl)
                    req.body.oldImageUrl = JSON.parse(req.body.oldImageUrl)
                const status = await varientUpdate(req.body)
                if (status) {
                    const filesToDelete = req.body.oldImageUrl
                    console.log(filesToDelete);
                    if (filesToDelete)
                        for (const file of filesToDelete) {
                            const filePath = path.join(__dirname, '../../../../', file);
                            console.log(filePath);
                            if (fs.existsSync(filePath)) {
                                console.log(filePath);
                                await fs.promises.unlink(filePath);
                                console.log(`Deleted file: ${file}`);
                            } else {
                                console.log(`File not found: ${file}`);
                            }
                        }
                    res.status(200).json({ success: true })
                }
                else {
                    res.status(200).json({ success: false, msg: "varient not found" })
                }
            } else {
                res.status(400).json({ error: valResult.array() })
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ "error": "internal server error" })
        }


    },
    varientDeleteHandler: async (req, res) => {
        try {
            const status = await varientDelete(new ObjectId(req.query.id))
            if (status) {
                res.status(200).json({ success: true })
            }
            else {
                res.status(200).json({ success: false, msg: "varient not found" })
            }
        } catch (error) {
            res.status(500).json({ "error": "internal server error" })
        }
    },
    productUpdateHandler: async (req, res) => {

        try {
            const valResult = validationResult(req);
            if (valResult.isEmpty()) {
                // req.body.id = new ObjectId(req.body.id)
                req.body.categoryId = new ObjectId(req.body.categoryId)
                console.log(req.body);
                const status = await productUpdate(req.body)
                if (status)
                    res.status(200).json({ success: true })
                else
                    res.status(200).json({ success: false, msg: "product not found" })
            } else {
                res.status(400).json({ error: valResult.array() })
            }
        } catch (error) {
            res.status(500).json({ "error": "internal server error" })
        }

    },
    productDeleteHandler: async (req, res) => {
        try {
            const status = await productDelete(new ObjectId(req.query.id))

            if (status) {
                res.status(200).json({ success: true })
            }
            else {
                res.status(200).json({ success: false, msg: "product not found" })
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ "error": "internal server error" })
        }



    },
    addCategoryHandler: async (req, res) => {
        try {
            const valResult = validationResult(req);
            if (valResult.isEmpty()) {
                await categoryAdd(req.body)
                res.status(200).json({ success: true })
            } else {
                res.status(400).json({ error: valResult.array() })
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ "error": "internal server error" })
        }
    },
    updateCategoryHandler: async (req, res) => {
        try {
            const valResult = validationResult(req);
            if (valResult.isEmpty()) {
                req.body.id = new ObjectId(req.body.id)
                await categoryUpdate(req.body)
                res.status(200).json({ success: true })
            } else {
                res.status(400).json({ error: valResult.array() })
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ "error": "internal server error" })
        }
    },
    deleteCategoryHandler: async (req, res) => {
        try {
            const id = new ObjectId(req.query.id)
            const status = await categoryDelete(id)
            if (status) {
                res.status(200).json({ success: true })
            }
            else {
                res.status(200).json({ success: false, msg: "category not found" })
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ "error": "internal server error" })
        }
    },
    getCategoryHandler: async (req, res) => {
        try {
            const result = await getCategory()
            res.status(200).json({ success: true, data: result })
        } catch (error) {
            console.log(error);
            res.status(500).json({ "error": "internal server error" })
        }
    },
    getSpecificCategoryHandler: async (req, res) => {
        try {
            const id = new ObjectId(req.params.id)
            const result = await getSpecificCategory(id)
            res.status(200).json({ success: true, data: result })
        } catch (error) {
            console.log(error);
            res.status(500).json({ "error": "internal server error" })
        }
    },
    editProductHandler: async (req, res) => {
        try {
            const id = new ObjectId(req.params.id)
            const result = await editProduct(id)
            res.status(200).json({ success: true, data: result })
        } catch (error) {
            console.log(error);
            res.status(500).json({ "error": "internal server error" })
        }

    },
    getAllProductsHandler: async (req, res) => {
        try {
            const result = await getAllProducts()
            res.status(200).json({ success: true, data: result })
        } catch (error) {
            console.log(error);
            res.status(500).json({ "error": "internal server error" })
        }
    },
    tokenVerifyHandler: (req, res) => {
        try {
            res.status(200).json({ success: true })
        } catch (error) {
            console.log(error);
            res.status(500).json({ "error": "internal server error" })
        }
    },
    editVarientHandler: async (req, res) => {
        try {
            const id = new ObjectId(req.params.id)
            const result = await getVarient(id)
            res.status(200).json({ success: true, data: result })

        } catch (error) {
            console.log(error);
            res.status(500).json({ "error": "internal server error" })
        }
    },
    productListChangeHandler: async (req, res) => {
        try {
            const id = new ObjectId(req.body.id)
            console.log(req.body.id);
            const status = await productListChange(id)
            if (status)
                res.status(200).json({ success: status })
            else
                res.status(200).json({ success: status, msg: "product not found" })

        } catch (error) {
            console.log(error);
            res.status(500).json({ "error": "internal server error" })
        }
    },
    viewProductHandler: async (req, res) => {
        try {
            const id = new ObjectId(req.params.id)
            const product = await viewProduct(id)
            res.status(200).json({ success: true, data: product })
        } catch (error) {
            console.log(error);
            res.status(500).json({ "error": "internal server error" })
        }
    },
    getProductAllVarientHandler: async (req, res) => {
        try {
            const id = new ObjectId(req.params.proId)
            const result = await getProductAllVarient(id)
            res.status(200).json({ success: true, data: result })
        } catch (error) {
            console.log(error);
            res.status(500).json({ "error": "internal server error" })
        }
    },
    ordersListHandler: async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const result = await ordersList(page, limit)
            res.status(200).json({ success: true, data: result.orders, totalPages: result.totalPages })
        } catch (error) {
            console.log(error);
            res.status(500).json({ "error": "internal server error" })
        }
    },
    orderStatusHandler: async (req, res) => {
        try {
            console.log("hee");
            const status = await changeStatus(new ObjectId(req.body.orderId), new ObjectId(req.body.userId), new ObjectId(req.body.productId), req.body.status)
            console.log(status);
            res.status(200).json({ success: true })
        } catch (error) {
            console.log(error);
            res.status(500).json({ "error": "internal server error" })
        }
    },
    returnordersListHandler: async (req, res) => {
        try {
            const orders = await returnOrdersList()
            res.status(200).json({ success: true, data: orders })
        } catch (error) {
            console.log(error);
            res.status(500).json({ "error": "internal server error" })
        }
    },
    orderReturnStatusHandler: async (req, res) => {
        try {

            const status = await changeReturnStatus(new ObjectId(req.body.orderId), new ObjectId(req.body.productId), req.body.status)
            console.log(status);
            res.status(200).json({ success: true })
        } catch (error) {
            console.log(error);
            res.status(500).json({ "error": "internal server error" })
        }
    },
    addCouponHandler: async (req, res) => {
        try {
            const valResult = validationResult(req)
            console.log(valResult.array());
            if (valResult.isEmpty()) {
                console.log(req.body);
                await addCoupon(req.body)
                res.status(200).json({ success: true })
            } else {
                res.status(400).json({ error: valResult.array() })
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ "error": "internal server error" })
        }
    },
    getCouponHandler: async (req, res) => {
        try {
            const id = req.params.id
            const result = await getCoupon(id)
            res.status(200).json({ success: true, data: result })
        } catch (error) {
            console.log(error);
            res.status(500).json({ "error": "internal server error" })
        }
    },
    updateCouponHandler: async (req, res) => {
        try {
            const valResult = validationResult(req)
            console.log(valResult.array());
            if (valResult.isEmpty()) {
                await updateCoupon(req.body)
                res.status(200).json({ success: true })
            } else {
                res.status(400).json({ error: valResult.array() })
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ "error": "internal server error" })
        }
    },
    getallCouponHandler: async (req, res) => {
        try {

            const result = await getAllCoupon()
            res.status(200).json({ success: true, data: result })
        } catch (error) {
            console.log(error);
            res.status(500).json({ "error": "internal server error" })
        }
    },
    handleDeleteCouponHandler: async (req, res) => {
        try {
            const status = await deleteCoupon(req.params.id)
            if (status) {
                res.status(200).json({ success: true })
            }
            else {
                res.status(200).json({ success: false, msg: "coupon not found" })
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ "error": "internal server error" })
        }
    },
    addOfferHandler: async (req, res) => {
        try {
            // const valResult = validationResult(req)
            // console.log(valResult.array());
            // if (valResult.isEmpty()) {
            console.log(req.body);
            await addOffer(req.body)
            res.status(200).json({ success: true })
            // } else {
            //     res.status(400).json({ error: valResult.array() })
            // }
        } catch (error) {
            console.log(error);
            res.status(500).json({ "error": "internal server error" })
        }
    },
    getallOffersHandler: async (req, res) => {
        try {

            const result = await getAllOffers()
            res.status(200).json({ success: true, data: result })
        } catch (error) {
            console.log(error);
            res.status(500).json({ "error": "internal server error" })
        }
    },
    getOfferHandler: async (req, res) => {
        try {
            const id = new ObjectId(req.params.id)
            const result = await getOffer(id)
            res.status(200).json({ success: true, data: result })
        } catch (error) {
            console.log(error);
            res.status(500).json({ "error": "internal server error" })
        }
    },
    updateOfferHandler: async (req, res) => {
        try {
            // const valResult = validationResult(req)
            // console.log(valResult.array());
            // if (valResult.isEmpty()) {
            console.log(req.body);
            req.body.applicables = req.body.applicables.map((obj) => {
                return obj.value
            })
            await updateOffer(req.body)
            res.status(200).json({ success: true })
            // } else {
            //     res.status(400).json({ error: valResult.array() })
            // }
        } catch (error) {
            console.log(error);
            res.status(500).json({ "error": "internal server error" })
        }
    },
    handleDeleteOfferHandler: async (req, res) => {
        try {
            const status = await deleteOffer(req.params.id)
            if (status) {
                res.status(200).json({ success: true })
            }
            else {
                res.status(200).json({ success: false, msg: "offer not found" })
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ "error": "internal server error" })
        }
    },
    salesReportHandler: async (req, res) => {
        try {
            const startDate = req.params.startDate
            const endDate = req.params.endDate

            const report = await generateSalesReport(startDate, endDate)
            console.log(report);
            res.status(200).json({ success: true, data: report })
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
    salesOverviewHandler: async (req, res) => {
        try {
            const filter = req.params.filter
            const data = await salesOverview(filter)
            res.status(200).json({ success: true, data: data })
        } catch (error) {
            console.log(error);
            res.status(500).json({ "error": "internal server error" })
        }

    }
}