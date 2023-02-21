const router = require("express").Router();
const loginController = require('../controllers/loginController');
const {body, validationResult}= require(`express-validator`);

router.post('/',[
    body('email',"Enter a valid email").isEmail(),
    body(`password`,"Password cannot be empty").exists()
], loginController.login);



module.exports = router;