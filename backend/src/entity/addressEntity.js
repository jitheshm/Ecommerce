class Address{
    constructor({name,phone,userId,pincode,locality,street,city,state,addressType}){
        this.name = name;
        this.phone = phone;
        this.userId = userId;
        this.pincode = pincode;
        this.locality = locality;
        this.street = street;
        this.city = city;
        this.state = state;
        this.addressType = addressType;
       
    }
}

module.exports = Address