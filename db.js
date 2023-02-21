const dotenv = require("dotenv");
const mongoose = require(`mongoose`);
dotenv.config();
const connectToMongo = () => {
    mongoose.connect(process.env.DB_CONNECT, {
        useNewUrlParser: true,
        useUnifiedTopology: true

    }).then(() => {
        console.log("successfully connected to database");
    }).catch((err) => console.log("don't connected to database" + err));

}

module.exports = connectToMongo;