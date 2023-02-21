const router = require("express").Router();
const paymentController = require('../controllers/paymentController');
const verify = require(`../middlewares/login`);
const { validationResult, body } = require(`express-validator`);

// router.post("/",
//     [
//         body('firstName', `Enter a valid firstname`),
//         body('lastName', "Enter a valid lastname"),
//         body(`company`, "Enter a valid companyname"),
//         body('country', `Enter a valid country`),
//         body('postalCode', "Enter a valid postcode"),
//         body(`city`, "Enter a valid city"),
//         body(`address`, "Enter a valid streetaddress"),
//         body(`state`, "Enter a valid county"),
//         body(`phone`, "Enter a valid phone"),
//         body('email', `Enter a valid email`),
//         body('comment', "Enter a valid notes"),
//         body(`puppieName`, "Enter a valid puppiename"),
//         body('puppieAmount', `Enter a valid amount`),
//         body('orderId', "Enter a valid orderId"),
//         body(`transactionId`, "Enter a valid transactionId"),
//         body(`paymentStatus`, "Enter a valid paymentstatus"),
//         body(`shippingStatus`, "Enter a valid shippingstatus"),
//     ],
//     paymentController.payment_create
// );


router.get("/", verify, paymentController.payment_all);
router.get("/:paymentId", paymentController.payment_details);
router.put("/:paymentId", verify, paymentController.payment_update);
router.delete("/:paymentId", verify, paymentController.payment_delete);
router.get("/transcation/:transactionId", paymentController.payment_by_transactionId);

router.get("/shipping/:shippingStatus", verify, paymentController.paymentByShipping);
router.get("/payment/:paymentStatus", verify, paymentController.paymentByPayment);

module.exports = router;