class Product{
    constructor({productName,brand,categoryId,aboutProduct,isListed,waranty,isDeleted=false}){
        this.productName=productName
        this.brand=brand
        this.categoryId=categoryId
        this.aboutProduct=aboutProduct
        this.isListed=isListed
        this.waranty=waranty
        this.isDeleted=isDeleted
            
        
    }
}
module.exports=Product