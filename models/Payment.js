const mongoose = require(`mongoose`);
const { Schema } = mongoose;
const PaymentSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },

    lastName: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: false
    },

    country: {
        type: String,
        required: true,
    },

    postalCode: {
        type: String,
        required: true,
    },

    city: {
        type: String,
        required: true,
    },

    address: {
        type: String,
        required: true,
    },

    state: {
        type: String,
        required: true,
    },

    phone: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
    },

    comment: {
        type: String,
        required: false,
    },

    puppieName: {
        type: String,
        required: true,
    },


    puppieAmount: {
        type: String,
        required: true,
    },

    orderId: {
        type: String,
        required: true,
    },

    transactionId: {
        type: String,
        required: true,
        unique:true,
    },

    paymentStatus: {
        type: String,
        required: true,
    },

    shippingStatus: {
        type: String,
        required: true,
    },

    date: {
        type: Date,
        default: Date.now
    },

})

const Payment = mongoose.model(`payment`, PaymentSchema);
module.exports = Payment;