class ProductVarient {
    constructor({productId, color, imagesUrl, stock, price, cost,avgRating,reviewCount}) {
        this.productId=productId
        this.color=color
        this.imagesUrl=imagesUrl
        this.stock=stock
        this.price=price
        this.cost=cost
        this.avgRating=avgRating
        this.reviewCount=reviewCount


    }
}
module.exports = ProductVarient