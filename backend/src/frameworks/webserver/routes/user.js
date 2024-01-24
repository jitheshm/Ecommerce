const express = require('express')
const { signup } = require('../../../adapters/controllers/userController')
const router = express.Router()
const {nodemailerEmail,nodemailerPassword}=require('../../config')

router.post('/signup', async (req, res) => {
    try {
        await signup(req.body,nodemailerEmail,nodemailerPassword)
        res.status(200).json({ "success": true })
    } catch (error) {
        //console.log(error);
        res.status(409).json({ "error": error.message })
    }
})




module.exports = router