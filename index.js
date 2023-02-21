const connectToMongo = require(`./db`);
const path = require('path');
const express = require(`express`);
const cors = require(`cors`);
const bodyParser = require('body-parser');
const app = express();

const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectToMongo();

app.use('/static', express.static(path.join(__dirname, 'uploads')))
app.use(`/api/puppie`, require(`./routes/puppie`));
app.use(`/api/email`, require(`./routes/email`));
app.use('/api/login', require('./routes/login'));
app.use('/api/paypal', require('./routes/paypal'));
app.use('/api/payment', require('./routes/payment'));
// if ( process.env.NODE_ENV == "production"){
    app.use(express.static("public/build"));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'public', 'build', 'index.html'));
    })
// }
// app.get('/', (req, res) => {
//     res.send("Hello World");
// })
app.listen(port, () => {
    console.log("Listening to port " + port);
})