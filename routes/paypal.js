const router = require("express").Router();
const paypalController = require('../controllers/paypalController');
const { body, validationResult } = require(`express-validator`);

router.post('/pay', [
    body('puppiename', "Enter a valid Puppie Name").notEmpty(),
    body(`amount`, "Enter a valid Puppie Amount").notEmpty(),
], paypalController.paypal_payment);

router.post('/success',[
    body('firstName', `Enter a valid firstname`),
    body('lastName', "Enter a valid lastname"),
    body(`company`, "Enter a valid companyname"),
    body('country', `Enter a valid country`),
    body('postalCode', "Enter a valid postcode"),
    body(`city`, "Enter a valid city"),
    body(`address`, "Enter a valid streetaddress"),
    body(`state`, "Enter a valid county"),
    body(`phone`, "Enter a valid phone"),
    body('email', `Enter a valid email`),
    body('comment', "Enter a valid notes"),
    body(`money`, "Enter a valid Money"),
    body('token', `Enter a valid token`),
    body('paymentId', "Enter a valid PaymentId"),
    body(`payerId`, "Enter a valid PayerId"),
] , paypalController.paypal_success);

router.get('/cancel', paypalController.paypal_cancel);



module.exports = router;