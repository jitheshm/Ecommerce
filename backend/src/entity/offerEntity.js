class Offer {
    constructor({ offerTitle, startDate, endDate, offerDetails, discountType, discount, offerType, applicables }) {
        this.offerTitle = offerTitle;
        this.startDate = startDate;
        this.endDate = endDate;
        this.offerDetails = offerDetails;
        this.discountType = discountType;
        this.discount = discount;
        this.offerType = offerType;
        this.applicables = applicables;

    }




}

module.exports = Offer;
