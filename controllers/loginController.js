const Login = require("../models/Login");
const jwt = require(`jsonwebtoken`);
const { body, validationResult } = require(`express-validator`);

const login = async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        let admin = await Login.findOne({ email: req.body.email });
        if (!admin) {
            return res.status(400).json({ success, error: "Please try to login with correct credentials" });
        }
        const passwordCompare = (req.body.password === admin.password);
        if (!passwordCompare) {
            return res.status(400).json({ success, error: "Please try to login with correct credentials" });
        }
        const data = {
            admin: {
                id: admin.id
            }
        };
        const authToken = jwt.sign(data, process.env.JWT_SECRET);
        success = true;
        tokenfor = "admin";
        adminId = admin.id;
        res.json({ success, tokenfor, authToken, adminId });


    } catch (err) {
        res.status(500).send("Internal Server Error");
    }


}

module.exports = {
    login
}