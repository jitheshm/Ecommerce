class Address{
    constructor({name,phone,userId,pincode,locality,street,city,state,home,work,defaultAddress}){
        this.name = name;
        this.phone = phone;
        this.userId = userId;
        this.pincode = pincode;
        this.locality = locality;
        this.street = street;
        this.city = city;
        this.state = state;
        this.home = home;
        this.work = work;
        this.default = defaultAddress;
    }
}

module.exports = Address