const jwt = require(`jsonwebtoken`);

const login = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: "Please authenticate using a valid token" });
    }

    try {
        const data = jwt.verify(token, process.env.JWT_SECRET);
        if (data.admin.id) {
            next();
        }

    } catch (error) {
        res.status(401).send({ error: "Please authenticate using a valid token" });
    }
}

module.exports = login;