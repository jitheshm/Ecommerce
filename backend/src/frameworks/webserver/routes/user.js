const express = require('express')
const { signup, verifyUser, loginUser } = require('../../../adapters/controllers/userController')
const router = express.Router()
const { nodemailerEmail, nodemailerPassword } = require('../../config')
const { ObjectId } = require('mongodb');
const { getOneVarientPerProduct } = require('../../../adapters/controllers/productController');
router.post('/signup', async (req, res) => {
    try {
        const token = await signup(req.body, nodemailerEmail, nodemailerPassword)
        if (token) {
            res.status(200).json({ "success": true, token: token })
        } else {
            res.status(200).json({ "error": "user already exist" })
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ "error": "internal server error" })
    }
})

router.post('/otpverify', async (req, res) => {
    try {
        const token = req.header('Authorization');
        //userId=new ObjectId(req.body.id)
        const newToken = await verifyUser(req.body, token)
        if (newToken) {
            res.json({ success: true, token: newToken })
        }
        else {
            res.json({ "error": "otp is incorrect" })
        }
    } catch (error) {
        console.log("error" + error);
    }
})

router.post('/login', async (req, res) => {
    try {
        const token = await loginUser(req.body)
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

router.get('/getproducts', async (req, res) => {
    try {
        const products = await getOneVarientPerProduct()
        res.status(200).json({ success: true, data: products })
    } catch (error) {
        console.log(error);
        res.status(500).json({ "error": "internal server error" })
    }
})




module.exports = router