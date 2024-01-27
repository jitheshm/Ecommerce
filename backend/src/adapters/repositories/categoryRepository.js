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
    }
}