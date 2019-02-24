const mongoose = require("mongoose");
const listItem = require("./routes/listItem");
const express = require("express");
const app = express();

mongoose.connect("mongodb://localhost/phuketlist")
  .then(() => console.log("Connected to db"))
  .catch(() => console.log("Unable to connect to db"));

app.use(express.json());
app.use("/api/bucketList", listItem);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
