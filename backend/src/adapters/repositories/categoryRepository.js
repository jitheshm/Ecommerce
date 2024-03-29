const CategoryModel = require('../models/categoryModel')
module.exports = {
    create: async (data) => {
        try {
            const exist = await CategoryModel.findOne({ category: { $regex: new RegExp(data.category, 'i') } })
            if (exist) {
                return false
            }
            const category = new CategoryModel(data)

            await category.save()
            return true
            console.log("new category inserted");
        } catch (error) {
            console.log("category insertion failed" + error);
            throw error
        }
    },
    update: async (data, id) => {
        try {
            const exist = await CategoryModel.findOne({ category: { $regex: new RegExp(data.category, 'i') }, _id: { $ne: id } })
            if (exist)
                return null
            const res = await CategoryModel.findOneAndUpdate({ _id: id, isDeleted: false }, data)
            if (!res)
                return null
            else 
                return res
        } catch (error) {
            console.log("category updation failed" + error);
            throw error
        }
    },
    delete: async (id) => {
        try {
            const status = await CategoryModel.findOne({ _id: id })
            if (status) {
                status.isDeleted = true
                await status.save()
                return true
            } else {
                return false
            }
        } catch (error) {
            console.log("category deletion failed" + error);
            throw error
        }
    },
    getCategory: async (page = 1, limit = 1000) => {
        try {
            const categories = await CategoryModel.find({ isDeleted: false }).skip((page - 1) * limit).limit(limit)
            const count = await CategoryModel.countDocuments({ isDeleted: false })
            console.log(categories);
            return { categories, totalPages: Math.ceil(count / limit) }
        } catch (error) {
            console.log("category fetching failed" + error);
            throw error
        }
    },
    getSpecificCategory: async (id) => {
        try {
            const category = await CategoryModel.findOne({ _id: id })

            return category
        } catch (error) {
            console.log("category fetching failed" + error);
            throw error
        }
    }
}