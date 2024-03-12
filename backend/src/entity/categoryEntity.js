class Category{
    constructor({category,imagesUrl,isDeleted=false}){
        this.category=category,
        this.isDeleted=isDeleted,
        this.imagesUrl=imagesUrl
    }
}

module.exports=Category