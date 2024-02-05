class ProductVarient {
    constructor({productId, color, imagesUrl, stock, actualPrice,salePrice,avgRating,reviewCount,isDeleted=false}) {
        this.productId=productId
        this.color=color
        this.imagesUrl=imagesUrl
        this.stock=stock
        this.actualPrice=actualPrice
        this.salePrice=salePrice
        this.avgRating=avgRating
        this.reviewCount=reviewCount,
        this.isDeleted=isDeleted


    }
}
module.exports = ProductVarient