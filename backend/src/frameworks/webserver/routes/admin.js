const express = require('express')
const { login, blockUser, unblockUser, fetchAllUsers } = require('../../../adapters/controllers/adminController')
const router = express.Router()
const { ObjectId } = require('mongodb');
const authToken = require('../../middlewares/adminAuthToken');
const { productAdd, varientAdd, varientUpdate, varientDelete, productUpdate, allVarientDelete, productDelete, editProduct, getAllProducts, getVarient, productListChange } = require('../../../adapters/controllers/productController');
const fileUpload = require('../../middlewares/fileUpload');
const path = require('path');
const fs = require('fs');
const { categoryAdd, categoryUpdate, categoryDelete, getCategory, getSpecificCategory } = require('../../../adapters/controllers/categoryController');
router.post('/login', async (req, res) => {
    try {
        const token = await login(req.body)
        if (token) {
            res.status(200).json({ success: true, token: token })
        } else {
            res.status(401).json({ error: "email or password is incorrect" })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ "error": "internal server error" })
    }
})

router.get('/blockuser', authToken, async (req, res) => {
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

})

router.get('/unblockuser', authToken, async (req, res) => {
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

})

router.get('/getusers', authToken, async (req, res) => {
    try {
        const users = await fetchAllUsers()
        res.status(200).json({ success: true, data: users })
    } catch (error) {
        console.log(error);
        res.status(500).json({ "error": "internal server error" })
    }
})

router.post('/addproduct', authToken, async (req, res) => {
    try {
        req.body.categoryId = new ObjectId(req.body.categoryId)
        const proId = await productAdd(req.body)
        res.status(200).json({ success: true })
    } catch (error) {
        console.log(error);
        res.status(500).json({ "error": "internal server error" })
    }
})

router.post('/addvarient', authToken, fileUpload("products"), async (req, res) => {

    try {
        if (req.files) {
            const imagesUrl = req.files.map((data) => {
                return data.path
            })
            req.body.imagesUrl = imagesUrl
        }
        //req.body.productId =new ObjectId(req.body.productId)
        const proVId = await varientAdd(req.body)
        res.status(200).json({ success: true })
    } catch (error) {
        console.log(error);
        res.status(500).json({ "error": "internal server error" })
    }


})

router.patch('/updatevarient', authToken, fileUpload("products"), async (req, res) => {
    try {
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

    } catch (error) {
        console.log(error);
        res.status(500).json({ "error": "internal server error" })
    }


})

router.delete('/deletevarient', authToken, async (req, res) => {
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
})


router.patch('/updateproduct', authToken, async (req, res) => {

    try {
        req.body.id = new ObjectId(req.body.id)
        req.body.categoryId = new ObjectId(req.body.categoryId)
        console.log(req.body);
        const status = await productUpdate(req.body)
        if (status)
            res.status(200).json({ success: true })
        else
            res.status(200).json({ success: false, msg: "product not found" })
    } catch (error) {
        res.status(500).json({ "error": "internal server error" })
    }

})

router.delete('/deleteproduct', authToken, async (req, res) => {
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



})

router.post('/addcategory', authToken, async (req, res) => {
    try {
        await categoryAdd(req.body)
        res.status(200).json({ success: true })
    } catch (error) {
        console.log(error);
        res.status(500).json({ "error": "internal server error" })
    }
})
router.patch('/updateCategory', authToken, async (req, res) => {
    try {
        req.body.id = new ObjectId(req.body.id)
        await categoryUpdate(req.body)
        res.status(200).json({ success: true })
    } catch (error) {
        console.log(error);
        res.status(500).json({ "error": "internal server error" })
    }
})

router.delete('/deleteCategory', authToken, async (req, res) => {
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
})
router.get('/getcategories', authToken, async (req, res) => {
    try {
        const result = await getCategory()
        res.status(200).json({ success: true, data: result })
    } catch (error) {
        console.log(error);
        res.status(500).json({ "error": "internal server error" })
    }
})

router.get('/getcategory/:id', authToken, async (req, res) => {
    try {
        const id = new ObjectId(req.params.id)
        const result = await getSpecificCategory(id)
        res.status(200).json({ success: true, data: result })
    } catch (error) {
        console.log(error);
        res.status(500).json({ "error": "internal server error" })
    }
})

router.get('/editProduct/:id', authToken, async (req, res) => {
    try {
        const id = new ObjectId(req.params.id)
        const result = await editProduct(id)
        res.status(200).json({ success: true, data: result })
    } catch (error) {
        console.log(error);
        res.status(500).json({ "error": "internal server error" })
    }

})

router.get('/products', authToken, async (req, res) => {
    try {
        const result = await getAllProducts()
        res.status(200).json({ success: true, data: result })
    } catch (error) {
        console.log(error);
        res.status(500).json({ "error": "internal server error" })
    }
})
router.get('/tokenverify', authToken, (req, res) => {
    try {
        res.status(200).json({ success: true })
    } catch (error) {
        console.log(error);
        res.status(500).json({ "error": "internal server error" })
    }
})


router.get('/editvarient/:id', authToken, async (req, res) => {
    try {
        const id = new ObjectId(req.params.id)
        const result = await getVarient(id)
        res.status(200).json({ success: true, data: result })

    } catch (error) {
        console.log(error);
        res.status(500).json({ "error": "internal server error" })
    }
},)


router.patch('/changelistproduct', async (req, res) => {
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
})



module.exports = router