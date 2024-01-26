const express = require('express')
const { login } = require('../../../adapters/controllers/adminController')
const router=express.Router()

router.post('/login',async(req,res)=>{
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





module.exports=router