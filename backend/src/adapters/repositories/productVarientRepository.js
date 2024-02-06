const ProductVarientModel = require('../models/productVarientModel')
module.exports = {
    addProductVarient: async (data) => {
        try {
            const productVarient = new ProductVarientModel(data)

            await productVarient.save()

            console.log("new product varient added");
            return productVarient._id
        } catch (error) {
            console.log("product varient insertion failed" + error);
            throw error
        }
    },
    updateProductVarient: async ({ id, imagesUrl, oldImageUrl, ...data }) => {
        try {

            // const filteredUpdateFields = {};
            // for (const [key, value] of Object.entries(data)) {
            //     if (value !== undefined) {
            //         filteredUpdateFields[key] = value;
            //     }
            // }

            // if (filteredUpdateFields || imagesUrl) {
            //     const result = await ProductVarientModel.findOneAndUpdate({ _id: id }, {
            //         $set: filteredUpdateFields, // Update other fields
            //         ...(imagesUrl && { $push: { imagesUrl: { $each: imagesUrl } } }), // Pushing data to the arrayField
            //     }, { new: true })
            //     console.log(result);
            // }

            // if (oldImageUrl) {
            //     console.log("oldImageUrl", oldImageUrl);
            //     const res=await ProductVarientModel.updateOne(
            //         { _id: id },
            //         { $pull: { imagesUrl: { $in: oldImageUrl } } }
                    
            //     );
            //     console.log(res);
            // }
            const result=await ProductVarientModel.findOne({_id:id,isDeleted:false})
            if(result){
                const existingImages=result.imagesUrl
                const newImages=existingImages.filter((item)=>!oldImageUrl.includes(item))
                const finalImages=[...newImages,...imagesUrl]
                data.imagesUrl=finalImages
                const res=await ProductVarientModel.updateOne({_id:id,isDeleted:false},data)
                if(res.matchedCount===0)
                    return false
                else
                    return true


            }
            else{
                return false
            }
        } catch (error) {
            console.log(error);
            throw error
        }
    },
    deleteVarient: async (varientId) => {
        try {
            const varient = await ProductVarientModel.findOne({ _id: varientId })
            if (varient) {
                varient.isDeleted = true
                await varient.save()
                return true
            } else {
                return false
            }
        } catch (error) {
            console.log(error);
            throw error
        }
    },
    deleteAllVarient: async (productId) => {
        try {
            const deleVarients = await ProductVarientModel.find({ productId: productId })
            if (deleVarients) {
                deleVarients.forEach(async (element) => {
                    element.isDeleted = true
                    await element.save()
                });
                return true
            } else {
                return false
            }

        } catch (error) {
            console.log(error);
            throw error
        }
    },
    getOneVarientPerProduct: async () => {
        try {
            const result = await ProductVarientModel.aggregate([
                
                {
                    $lookup: {
                        from: "products",
                        localField: "productId",
                        foreignField: "_id",
                        as: "productDetails"

                    }
                },
                {
                    $match: {
                        "productDetails.isListed": true,
                        "productDetails.isDeleted": false,
                    }
                },
                
                {
                    $group: {
                        _id: "$productId",
                        productVarient: { $first: "$$ROOT" }
                    }
                },
                {
                    $replaceRoot: { newRoot: "$productVarient" }
                }
            ]).exec()
            console.log(result);
            return result
        } catch (error) {
            console.log(error);
            throw error
        }
    },
    getVarientDetails: async (color) => {
        const varientDetail = await ProductVarientModel.aggregate([
            {
                $match: {
                    color: color
                }
            },
            {
                $lookup: {
                    from: "products",
                    localField: "productId",
                    foreignField: "_id",
                    as: "productDetails"

                }
            },
        ]).exec()
        return varientDetail
    },
    getVarient:async(id)=>{
        try {
            const result=await ProductVarientModel.findOne({_id:id})
            return result
        } catch (error) {
            console.log(error);
            throw error
        }
    },
    getColorList:async(id)=>{
        try {
            const colorList=await ProductVarientModel.aggregate([
                {
                    $match:{
                        productId:id
                    }
                },
                {
                    $group:{
                        _id:"$color"
                    }
                },
                { $project: {  
                    _id:0,
                    color: "$_id",
                   
                 }
              }
            ]).exec()
            console.log(colorList);
            return colorList
        } catch (error) {
            console.log(error);
            throw error
        }
    }
}