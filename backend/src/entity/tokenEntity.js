class Token{
    constructor(user,role){
      
            this.id=user._id,
            this.name=user.firstName,
            this.isVerified=user.isVerified,
            this.role=role
        
    }
}
module.exports=Token