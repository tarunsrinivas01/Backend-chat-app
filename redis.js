const { resolve } = require("path");
var redis = require("redis");

exports.init = () => {
  return new Promise((resolve, reject) => {
    const redisClient = redis.createClient();
    redisClient.connect();

    redisClient.on("error", (error) => {
      console.error(error);
      return reject(error);
    });

    redisClient.on('connect', () => {
        console.info('redis connected successfully');
        return resolve({
            redisClient: redisClient
        })
    })
  });
};
