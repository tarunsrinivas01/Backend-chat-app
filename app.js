require("dotenv").config();
const app = require("express")();

const mongo = require("./mongodb");
const redis = require('./redis')
var cors = require('cors')
var bodyParser = require('body-parser')


// routes
const routes = require("./routes/routes");
app.use(cors({
  origin:"*"
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const init = () => {
  return Promise.all([
    mongo.init(),
    redis.init()
  ]).then((initialisation) => {
    app.use(routes);
    app.listen(process.env.PORT, () => {
      console.info('listening on', process.env.PORT)
    });
  });
};
init();
