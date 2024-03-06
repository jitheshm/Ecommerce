const CategoryModel = require('../models/categoryModel')
module.exports = {
    create: async (data) => {
        try {
            const category = new CategoryModel(data)

            await category.save()

            console.log("new category inserted");
        } catch (error) {
            console.log("category insertion failed" + error);
            throw error
        }
    },
    update: async (data, id) => {
        try {
            const res = await CategoryModel.updateOne({ _id: id, isDeleted: false }, data)
            if (res.matchedCount === 0)
                return false
            else
                return true
        } catch (error) {
            console.log("category insertion failed" + error);
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
    getCategory: async (page, limit) => {
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