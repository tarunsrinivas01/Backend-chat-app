require("dotenv").config();

var mongoose = require("mongoose");

const connectToMongo = () => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("mongoDb is connected");
        resolve(mongoose.connection);
      })
      .catch((err) => {
        console.error("mongo connection failed, reconnecting...", err.message);
        // Don't call connectToMongo() here to avoid recursion
        // Instead, you can handle the reconnection logic in a separate function or event.
      });
  });
};

const handleReconnection = () => {
  console.log("Handling reconnection...");
  connectToMongo()
    .then(() => {
      console.log("Reconnection successful");
    })
    .catch((err) => {
      console.error("Reconnection failed:", err.message);
      // Optionally, you can add a delay before retrying to avoid continuous attempts.
      // setTimeout(handleReconnection, 5000); // Retry after 5 seconds
    });
};

mongoose.connection.on("error", (err) => {
  console.error("mongo connection failed, reconnecting...", err.message);
  handleReconnection();
});

mongoose.connection.on("disconnected", () => {
  console.error("mongo disconnected, reconnecting...");
  handleReconnection();
});

module.exports = {
  init: connectToMongo,
};
