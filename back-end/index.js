const mongoose = require("mongoose");
const bucketList = require("./routes/bucketList");
const express = require("express");
const app = express.createServer();

mongoose.connect("mongodb://localhost/phuketlist")
  .then(() => console.log("Connected to db"))
  .catch(() => console.log("Unable to connect to db"));

app.use(express.json());
app.use("/api/bucketList", bucketList);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
