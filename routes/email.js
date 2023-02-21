const router = require("express").Router();
const emailController = require('../controllers/emailController');
const { validationResult, body } = require(`express-validator`);

router.post("/",
  [
    body('to', `Enter a valid Email`).isEmail(),
    body('subject', "Enter a valid subject").isLength({ min: 3 }).notEmpty(),
    body(`message`, "Enter a valid text").isLength({ min: 6 }),
    body(`sender`, "Enter a valid sender")
  ], emailController.email_send);

module.exports = router;