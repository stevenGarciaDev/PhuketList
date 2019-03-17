const mongoose = require("mongoose");
const config = require('config');
const auth = require("./routes/auth");
const bucketList = require("./routes/bucketList");
const listItem = require("./routes/listItem");
const users = require("./routes/users");
const post = require("./routes/post");
var cors = require('cors');
const express = require("express");
const app = express();

if (!config.get('jwtPrivateKey')) {
  console.log('FATAL ERROR: jwtPrivateKey is not defined');
  process.exit(1);
}

mongoose.connect("mongodb://localhost/phuketlist")
  .then(() => console.log("Connected to db"))
  .catch(() => console.log("Unable to connect to db"));

app.use(cors());
app.use(express.json());
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/bucketList', bucketList);
app.use('/api/listitem', listItem);
app.use('/api/post/', post);

const port = process.env.PORT || 3900;
app.listen(port, () => console.log(`Listening on port ${port}...`));
