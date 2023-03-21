const express = require("express");
const app = express();
const sequelize = require("./database/db");

// routes
const userroutes = require("./routes/userroutes");



const user=require('./models/user')

const bodyParser = require("body-parser");
const cors = require("cors");

app.use(cors({
  origin:"*"
}));
console.log("entered");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/user", userroutes);



sequelize
  .sync()
  .then(app.listen(3000))
  .catch((err) => console.log(err));