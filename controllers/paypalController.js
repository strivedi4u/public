const Payment = require("../models/Payment");
const Email = require("../controllers/emailController");
const paypal = require("paypal-rest-sdk");

paypal.configure({
    mode: "sandbox", //sandbox or live
    client_id:
        "AZfNIXo5CPTD8gJEyzWPqz6AkxvNMK9W76xh5Z7Tts-8atM0aPvTEPcx-S7uAPIU5ZZX9iyfMT3DOurt",
    client_secret:
        "EDsGpEKNiHI-wr6OwqWkr9mRbDumHdJInnIli6O6F2RNiCdqNFsFunnXQmRZBFr1O70Bk9NBG0gjHxRu",
});





const paypal_payment = async (req, res) => {
    var money = req.body.amount;
    var puppieName = req.body.puppiename;
    console.log(money);
    const create_payment_json = {
        intent: "sale",
        payer: {
            payment_method: "paypal",
        },
        redirect_urls: {
            return_url: "http://localhost:3000/success?money=" + money,
            cancel_url: "http://localhost:3000/cancel",
        },
        transactions: [
            {
                item_list: {
                    items: [
                        {
                            name: puppieName,
                            sku: "001",
                            price: money,
                            currency: "USD",
                            quantity: 1,
                        },
                    ],
                },
                amount: {
                    currency: "USD",
                    total: money,
                },
                description: "This payment is accepted by the payment website.",
            },
        ],
    };

    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            //throw error;
            console.log(error);
        } else {
            for (let i = 0; i < payment.links.length; i++) {
                if (payment.links[i].rel === "approval_url") {
                    // res.redirect(payment.links[i].href);
                    res.status(200).send({ link: payment.links[i].href });
                }
            }
        }
    }
    )
};




const paypal_success = async (req, res) => {
    const payerId = req.body.payerId;
    const paymentId = req.body.paymentId;
    const amount = req.body.money;
    const token = req.body.token;

    // var flag = false;

    const phone = req.body.phone;
    const company = req.body.company;
    const comment = req.body.comment;


    const execute_payment_json = {
        payer_id: payerId,
        transactions: [
            {
                amount: {
                    currency: "USD",
                    total: amount,
                },
            },
        ],
    };

    try {
        paypal.payment.execute(
            paymentId,
            execute_payment_json,
             async function (error, payment) {
                console.log("Don");
                if (error) {
                    console.log(error.response);
                    //throw error;
                } else {

                    var firstName = payment.payer.payer_info.first_name;
                    var lastName = payment.payer.payer_info.last_name;
                    var country = payment.payer.payer_info.shipping_address.country_code;
                    var postalCode = payment.payer.payer_info.shipping_address.postal_code;
                    var city = payment.payer.payer_info.shipping_address.city;
                    var address = payment.payer.payer_info.shipping_address.line1;
                    var state = payment.payer.payer_info.shipping_address.state;
                    var email = payment.payer.payer_info.email;

                    if (req.body.firstName != 'undefined') {
                        firstName = req.body.firstName;
                    }
                    if (req.body.lastName != 'undefined') {
                        lastName = req.body.lastName;
                    }
                    if (req.body.country != 'undefined') {
                        country = req.body.country;
                    }
                    if (req.body.postalCode != 'undefined') {
                        postalCode = req.body.postalCode;
                    }
                    if (req.body.city != 'undefined') {
                        city = req.body.city;
                    }
                    if (req.body.address != 'undefined') {
                        address = req.body.address;
                    }
                    if (req.body.state != 'undefined') {
                        state = req.body.state;
                    }
                    if (req.body.email != 'undefined') {
                        email = req.body.email;
                    }
                    console.log("HELLO");
                    console.log(phone);
                    console.log(email);
                    console.log(firstName);
                    console.log("HELLO");
                    console.log("Doneok");
                    console.log("ok ok");
                    try {
                        var payments = await Payment.create(
                            {
                                firstName: firstName,
                                lastName: lastName,
                                country: country,
                                postalCode: postalCode,
                                city: city,
                                address: address,
                                state: state,
                                email: email,
                                puppieName: payment.transactions[0].item_list.items[0].name,
                                puppieAmount: payment.transactions[0].amount.total,
                                orderId: payment.cart,
                                transactionId: payment.id,
                                paymentStatus: "Completed",
                                shippingStatus: "Pending",
                                date: payment.update_time,
                                phone: phone,
                                company: company,
                                comment: comment,
                            }
                        );
                        console.log(payments);
                        if (payments) {
                            console.log("My Name is Shashank");
                            // flag = true;
                            res.status(200).send(payments);
                        }
                    }
                    catch (err) {
                        console.log(error);
                    }

                    // res.status(200).send( [payment]);

                }
            }
        );
    }
    catch (e) {
        console.log(e);
    }

    // if(flag === true){
    //     try {
    //         const emailSend =  Email.email_payment(email, payment.id);
    //         console.log(emailSend);
    //     }
    //     catch { error } {
    //         console.log(error);
    //     }
    // }
};


const paypal_cancel = async (req, res) => res.send('Cancelled');


module.exports = {
    paypal_payment,
    paypal_success,
    paypal_cancel
}

