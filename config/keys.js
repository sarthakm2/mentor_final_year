const config = require("config");

if(process.env.NODE_ENV === "production") {
  module.exports = {
    "JWT_SECRET": process.env.JWT_SECRET,
    "MONGO_URI": process.env.MONGO_URI,
    "GOOGLE_CLIENT_ID": process.env.GOOGLE_CLIENT_ID,
  }
} else {
  module.exports = {
    JWT_SECRET: "json_web_token_secret",
    MONGO_URI: "mongodb://sarthak2:sarthaKm2@ds215388.mlab.com:15388/mentor",
    GOOGLE_CLIENT_ID: "jhvbjkbv",
  }
}