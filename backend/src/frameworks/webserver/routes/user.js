const express = require('express')
const { signup, verifyUser, loginUser } = require('../../../adapters/controllers/userController')
const router = express.Router()
const { nodemailerEmail, nodemailerPassword } = require('../../config')
const { ObjectId } = require('mongodb');
const { getOneVarientPerProduct, getVarientDetail, getcolorlist } = require('../../../adapters/controllers/productController');
const userAuthToken = require('../../middlewares/userAuthToken');
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
        const result = await verifyUser(req.body, token)
        if (result) {
            console.log(result);
            res.json({ success: true, token: result.token, name: result.name })
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
        const result = await loginUser(req.body)
        if (result) {
            res.status(200).json({ success: true, token: result.token, name: result.name })
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

router.get('/getproductdetails/:color', async (req, res) => {
    try {
        const color = req.params.color
        const varientDetails = await getVarientDetail(color)
        res.status(200).json({ success: true, data: varientDetails })
    } catch (error) {
        console.log(error);
        res.status(500).json({ "error": "internal server error" })
    }
})

router.get('/tokenverify', userAuthToken, (req, res) => {
    res.status(200).json({ success: true, name: req.user.name })
})

router.get('/getcolorlist/:id',async(req,res)=>{
    try {
        const id=new ObjectId(req.params.id)
        const result=await getcolorlist(id)
        res.status(200).json({success:true,data:result})
    } catch (error) {
        console.log(error);
        res.status(500).json({ "error": "internal server error" })
    }
})



module.exports = router