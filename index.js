const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");
const authorRoute = require("./routes/author");
const bookRoute = require("./routes/book")

dotenv.config();
//CONNECT DATABASE  
mongoose.connect(process.env.MONGODB_URl)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });


app.use(bodyParser.json({ limmit: "50mb" }))
app.use(cors());
app.use(morgan("common"));


app.get("/api", (req, res) => {
  res.status(200).json("hello")
});

//ROUTES
app.use("/v1/author", authorRoute);
app.use("/v1/book", bookRoute);




app.listen(8000, () => {
  console.log("Server is running ...");
});
