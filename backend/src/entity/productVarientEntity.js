class ProductVarient {
    constructor({productId, colorId, imagesUrl, stock, price, cost,avgRating,reviewCount}) {
        this.productId=productId
        this.colorId=colorId
        this.imagesUrl=imagesUrl
        this.stock=stock
        this.price=price
        this.cost=cost
        this.avgRating=avgRating
        this.reviewCount=reviewCount


    }
}
module.exports = ProductVarient