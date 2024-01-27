const express = require('express')
const { login, blockUser, unblockUser, fetchAllUsers } = require('../../../adapters/controllers/adminController')
const router = express.Router()
const { ObjectId } = require('mongodb');
const authToken = require('../../middlewares/adminAuthToken');
const { productAdd, varientAdd, varientUpdate } = require('../../../adapters/controllers/productController');
const fileUpload = require('../../middlewares/fileUpload');
const path = require('path');
const fs = require('fs');
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

router.patch('/updatevarient', fileUpload("products"), async (req, res) => {
    try {
        if (req.files) {
            const imagesUrl = req.files.map((data) => {
                return data.path
            })
            req.body.imagesUrl = imagesUrl

        }

        await varientUpdate(req.body)
        const filesToDelete = req.body.oldImageUrl
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
    } catch (error) {
        res.status(500).json({ "error": "internal server error" })
    }


})




module.exports = router