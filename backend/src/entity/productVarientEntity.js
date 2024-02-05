class ProductVarient {
    constructor({productId, color, imagesUrl, stock, price, cost,avgRating,reviewCount,isDeleted=false}) {
        this.productId=productId
        this.color=color
        this.imagesUrl=imagesUrl
        this.stock=stock
        this.price=price
        this.cost=cost
        this.avgRating=avgRating
        this.reviewCount=reviewCount,
        this.isDeleted=isDeleted


    }
}
module.exports = ProductVarient