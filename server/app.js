const express = require("express");
const cors = require("cors");
const app = express();

app.use( express.json());
app.use(cors());


app.use("/img",express.static("./uploads"));



const userroute = require("./route/userRoute");
const createpost = require("./route/createpost");
const commentroute = require('./route/commentRoute');
const likeRoute  = require('./route/likeRoute');
const followRoute = require("./route/followRoute");
const storiesRoute = require("./route/storiesRoute");


app.use("/api",userroute);
app.use("/api",createpost);
app.use("/api",commentroute);
app.use("/api",likeRoute);
app.use("/api",followRoute);
app.use("/api",storiesRoute);



module.exports = app