const express = require("express");
const app = express();
const sequelize = require("./database/db");

// routes
const userroutes = require("./routes/userroutes");
const chatroutes=require("./routes/chatroutes")


// models
const user=require('./models/user')
const chats=require('./models/chat')

const bodyParser = require("body-parser");
const cors = require("cors");

app.use(cors({
  origin:"*"
}));
console.log("entered");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/chat",chatroutes)
app.use("/user", userroutes);


// relations
user.hasMany(chats)
chats.belongsTo(user)

sequelize
  .sync()
  .then(app.listen(3000))
  .catch((err) => console.log(err));