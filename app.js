require("dotenv").config();
var cors = require('cors');

const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.DATABASE_URL, {
    "useNewUrlParser": true,
    "useUnifiedTopology": true
}).then(() => {
    console.log("MongoDB Connected!!")
})

const router = require('./router')
app.use('/', router);

app.listen(process.env.PORT || 5000, () => {
    console.log(`Listening on port ${port}`);
})