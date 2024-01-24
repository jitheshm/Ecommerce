class User{
    constructor({firstName,lastName,email,password}){
        this.firstName=firstName
        this.lastName=lastName
        this.email=email
        this.password=password
        this.isVerified=false
        this.dateOfJoin=new Date()
    }
}

module.exports=User