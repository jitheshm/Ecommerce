const express = require('express')
const { signup, verifyUser } = require('../../../adapters/controllers/userController')
const router = express.Router()
const {nodemailerEmail,nodemailerPassword}=require('../../config')
const { ObjectId } = require('mongodb');
router.post('/signup', async (req, res) => {
    try {
        await signup(req.body,nodemailerEmail,nodemailerPassword)
        res.status(200).json({ "success": true })
    } catch (error) {
        //console.log(error);
        res.status(409).json({ "error": error.message })
    }
})

router.post('/otpverify',async(req,res)=>{
    try {
        //const token = req.header('Authorization');
        userId=new ObjectId(req.body.id)
        const status=await verifyUser(req.body,userId)
        if(status){
            res.json({success:true})
        }
        else{
            res.json({"error":"otp is incorrect"})
        }
    } catch (error) {
        console.log("error"+error);
    }
})




module.exports = router