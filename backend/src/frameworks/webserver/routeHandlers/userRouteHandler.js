const { nodemailerEmail, nodemailerPassword } = require('../../config')
const { ObjectId } = require('mongodb');
const { getOneVarientPerProduct, getVarientDetail, getcolorlist } = require('../../../adapters/controllers/productController');

const { signup, verifyUser, loginUser, resendOtp } = require('../../../adapters/controllers/userController');
const { addAddress, updateAddress, deleteAddress, getUserAllAddress, findAddress } = require('../../../adapters/controllers/addressController');
const { addToCart, changeQuantity } = require('../../../adapters/controllers/cartController');




module.exports = {
    signupHandler: async (req, res) => {
        try {
            const token = await signup(req.body, nodemailerEmail, nodemailerPassword)
            if (token) {
                res.status(200).json({ success: true, token: token })
            } else {
                res.status(200).json({ success: false, "error": "user already exist" })
            }

        } catch (error) {
            console.log(error);
            res.status(500).json({ "error": "internal server error" })
        }
    },
    otpverifyHandler: async (req, res) => {
        try {
            const token = req.header('Authorization');
            //userId=new ObjectId(req.body.id)
            const result = await verifyUser(req.body, token)
            if (result) {
                console.log(result);
                res.json({ success: true, token: result.token, name: result.name })
            }
            else {
                res.json({ success: false, "error": "otp is incorrect" })
            }
        } catch (error) {
            console.log("error" + error);
            res.status(500).json({ "error": "internal server error" })
        }
    },
    loginHandler: async (req, res) => {
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
    },
    getProductHandler: async (req, res) => {
        try {
            const products = await getOneVarientPerProduct()
            res.status(200).json({ success: true, data: products })
        } catch (error) {
            console.log(error);
            res.status(500).json({ "error": "internal server error" })
        }
    },
    getProductDetailHandler: async (req, res) => {
        try {
            const color = req.params.color
            const varientDetails = await getVarientDetail(color)
            res.status(200).json({ success: true, data: varientDetails })
        } catch (error) {
            console.log(error);
            res.status(500).json({ "error": "internal server error" })
        }
    },
    tokenVerifyHandler: (req, res) => {
        res.status(200).json({ success: true, name: req.user.name })
    },
    getColorListHandler: async (req, res) => {
        try {
            const id = new ObjectId(req.params.id)
            const result = await getcolorlist(id)
            res.status(200).json({ success: true, data: result })
        } catch (error) {
            console.log(error);
            res.status(500).json({ "error": "internal server error" })
        }
    },
    resendOtpHandler: async (req, res) => {
        try {
            const status = await resendOtp(req.user, nodemailerEmail, nodemailerPassword)
            console.log(status);
            if (status) {
                res.status(200).json({ success: true })
            }
            else {
                res.status(200).json({ success: false, msg: "otp not resent" })
            }

        } catch (error) {
            console.log(error);
            res.status(500).json({ "error": "internal server error" })
        }
    },
    addAddressHandler: async (req, res) => {
        try {
            const status = await addAddress(req.body, req.user.id)
            console.log(status);
            if (status) {
                res.status(200).json({ success: true })
            }
            else {
                res.status(200).json({ success: false, msg: "address not added" })
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ "error": "internal server error" })
        }
    },
    updateAddressHandler: async (req, res) => {
        try {
            // const id = new ObjectId(req.body.id)
            const status = await updateAddress(req.body)
            console.log(status);
            if (status) {
                res.status(200).json({ success: true })
            }
            else {
                res.status(200).json({ success: false, msg: "address not updated" })
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ "error": "internal server error" })
        }
    },
    deleteAddressHandler: async (req, res) => {
        try {
            const status = await deleteAddress(req.query.id)
            console.log(status);
            if (status) {
                res.status(200).json({ success: true })
            }
            else {
                res.status(200).json({ success: false, msg: "address not deleted" })
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ "error": "internal server error" })
        }
    },
    getUserAllAddressHandler: async (req, res) => {
        try {
            const result = await getUserAllAddress(req.user.id)
            res.status(200).json({ success: true, data: result })

        } catch (error) {
            console.log(error);
            res.status(500).json({ "error": "internal server error" })
        }

    },
    fetchAddressHandler: async (req, res) => {
        try {
            const address = await findAddress(req.params.id)
            res.status(200).json({ success: true, data: address })
        } catch (error) {
            console.log(error);
            res.status(500).json({ "error": "internal server error" })
        }
    },
    addToCartHandler: async (req, res) => {
        try {
            const status = await addToCart(req.user.id, new ObjectId(req.body.productId))
            if (status) {
                res.status(200).json({ success: true })
            }
            else {
                res.status(200).json({ success: false, msg: "product not added to cart" })
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ "error": "internal server error" })
        }
    },
    incrementQuantityHandler: async (req, res) => {
        try {
            const status = await changeQuantity(new ObjectId(req.user.id), new ObjectId(req.body.productId), 1)
            if (status) {
                res.status(200).json({ success: true })
            }
            else {
                res.status(200).json({ success: false, msg: "quantity not updated" })
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ "error": "internal server error" })
        }
    },
    decrementQuantityHandler: async (req, res) => {
        try {
            const status = await changeQuantity(new ObjectId(req.user.id), new ObjectId(req.body.productId),-1)
            if (status) {
                res.status(200).json({ success: true })
            }
            else {
                res.status(200).json({ success: false, msg: "quantity not updated" })
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ "error": "internal server error" })
        }
    }
}