const Payment = require("../models/Payment");
const { validationResult } = require(`express-validator`);


const payment_all = async (req, res) => {
    try {
        const payment = await Payment.find();
        res.json(payment);
    } catch (error) {
        res.json({ message: error });
    }
};

const payment_details = async (req, res) => {
    try {
        const payment = await Puppie.findById(req.params.paymentId);
        res.json(payment);
    } catch (error) {
        res.json({ message: error });
    }
};

// const payment_create = (req) => {
//     console.log(req);
//     console.log(req.payment.id);
//     let success = false;
//     // const errors = validationResult(req);
//     // if (!errors.isEmpty()) {
//     //     return res.status(400).json({ success, errors: errors.array() });
//     // }
//     console.log("Hello");
// try{
//     var payments = Payment.create(
//         {
//             firstName: req.payment.payer.payer_info.first_name,
//             lastName: req.payment.payer.payer_info.last_name,
//             country: req.payment.payer.payer_info.shipping_address.country_code,
//             postalCode: req.payment.payer.payer_info.shipping_address.postal_code,
//             city: req.payment.payer.payer_info.shipping_address.city,
//             address: req.payment.payer.payer_info.shipping_address.line1,
//             state: req.payment.payer.payer_info.shipping_address.state,
//             phone: req.payment.intent,
//             email: req.payment.payer.payer_info.email,
//             puppieName: req.payment.transactions[0].item_list.items[0].name,
//             puppieAmount: req.payment.transactions[0].amount.total,
//             orderId: req.payment.cart,
//             transactionId: req.payment.id,
//             paymentStatus: "Completed",
//             shippingStatus: "Pending",
//             date: req.payment.update_time
//         }
//     );
//     console.log(payments);
// }
// catch(err){
//     console.log(error);
// }
// };







const payment_update = async (req, res) => {
    try {
        const payment = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            company: req.body.company,
            country: req.body.country,
            postalCode: req.body.postalCode,
            city: req.body.city,
            address: req.body.address,
            state: req.body.state,
            phone: req.body.phone,
            email: req.body.email,
            comment: req.body.comment,
            puppieName: req.body.puppieName,
            puppieAmount: req.body.puppieAmount,
            orderId: req.body.orderId,
            transactionId: req.body.transactionId,
            paymentStatus: req.body.paymentStatus,
            shippingStatus: req.body.shippingStatus,
            date: req.body.date
        };

        const updatedPayment = await Payment.findByIdAndUpdate(
            { _id: req.params.paymentId },
            payment
        );
        res.json(updatedPayment);
    } catch (error) {
        res.json({ message: error });
    }
};




const payment_delete = async (req, res) => {
    try {
        const payment = await Payment.findByIdAndDelete(req.params.paymentId);
        res.json(payment);
    } catch (error) {
        res.json({ message: error });
    }
};



const payment_by_transactionId = async (req, res) => {
    console.log("Hi");
    try {
        const payment = await Payment.findOne({ transactionId: req.params.transactionId });
        res.json(payment);
    } catch (error) {
        res.json({ message: error });
    }
};

const paymentByShipping = async (req, res) => {
    try {
        const payment = await Payment.find({ shippingStatus: req.params.shippingStatus });
        res.json(payment);
    } catch (error) {
        res.json({ message: error });
    }
};


const paymentByPayment = async (req, res) => {
    try {
        const payment = await Payment.find({ paymentStatus: req.params.paymentStatus });
        res.json(payment);
    } catch (error) {
        res.json({ message: error });
    }
};


module.exports = {
    payment_all,
    payment_details,
    // payment_create,
    payment_update,
    payment_delete,
    payment_by_transactionId,
    paymentByShipping,
    paymentByPayment
}