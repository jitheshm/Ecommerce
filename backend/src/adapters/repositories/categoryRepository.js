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
            await CategoryModel.updateOne({ _id: id }, data)
        } catch (error) {
            console.log("category insertion failed" + error);
            throw error
        }
    },
    delete: async (id) => {
        try {
            await CategoryModel.deleteOne({ _id: id })
        } catch (error) {
            console.log("category deletion failed" + error);
            throw error
        }
    },
    getCategory: async() => {
        try {
            const categories=await CategoryModel.find()
            console.log(categories);
            return categories
        } catch (error) {
            console.log("category fetching failed" + error);
            throw error
        }
    }
}