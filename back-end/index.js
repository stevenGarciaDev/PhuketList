const mongoose = require("mongoose");
const listItem = require("./routes/listItem");
const config = require('config');
const auth = require("./routes/auth");
const users = require("./routes/users");
const express = require("express");
const app = express();

if (!config.get('jwtPrivateKey')) {
  console.log('FATAL ERROR: jwtPrivateKey is not defined');
  process.exit(1);
}

mongoose.connect("mongodb://localhost/phuketlist")
  .then(() => console.log("Connected to db"))
  .catch(() => console.log("Unable to connect to db"));

app.use(express.json());
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/bucketList', listItem);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
