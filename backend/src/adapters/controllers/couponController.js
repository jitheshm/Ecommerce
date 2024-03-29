const addCoupon = require("../../usecase/coupon/addCoupon")
const applyCoupon = require("../../usecase/coupon/applyCoupon")
const deleteCoupon = require("../../usecase/coupon/deleteCoupon")
const getActiveCoupons = require("../../usecase/coupon/getActiveCoupons")


const getAllCoupon = require("../../usecase/coupon/getAllCoupon")
const getCoupon = require("../../usecase/coupon/getCoupon")
const updateCoupon = require("../../usecase/coupon/updateCoupon")
const couponRepository = require("../repositories/couponRepository")

module.exports = {
    addCoupon: async (data) => {
        return await addCoupon(data, couponRepository)
    },
    getCoupon: async (id) => {
        return await getCoupon(id, couponRepository)
    },
    updateCoupon: async (id,data) => {
        return await updateCoupon(id,data, couponRepository)
    },
    getAllCoupon: async (page, limit) => {
        return await getAllCoupon(couponRepository,page, limit)
    },
    deleteCoupon: async (id) => {
        return await deleteCoupon(id, couponRepository)
    },
    applyCoupon: async (data, id) => {
        return await applyCoupon(data, id, couponRepository)
    },
    getActiveCoupons: async () => {
       
        return await getActiveCoupons(couponRepository)
    }
}