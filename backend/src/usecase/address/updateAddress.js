const Address = require("../../entity/addressEntity")

const validateField = (regex, field, fieldName) => {
    if (!regex.test(field) || field === undefined || field === null || field === '') {
        const error = new Error(`Invalid ${fieldName}`);
        error.statusCode = 400;
        console.log(error);
        throw error;
    }
}

module.exports = async (addressRepository, data) => {

    validateField(/^[^\s]{3}[\s\S]*$/, data.name, 'name');
    validateField(/^[0-9]{10}$/, data.phone, 'phone');
    validateField(/^[^\s]{3}[\s\S]*$/, data.city, 'city');
    validateField(/^[^\s]{3}[\s\S]*$/, data.street, 'street');
    validateField(/^[^\s]{3}[\s\S]*$/, data.locality, 'locality');
    validateField(/^[^\s]{3}[\s\S]*$/, data.state, 'state');
    validateField(/^[0-9]{6}$/, data.pincode, 'pincode');

    const addressData = new Address(data)
    return await addressRepository.updateAddress(addressData, data.id)

}