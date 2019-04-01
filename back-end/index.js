const mongoose = require("mongoose");
const config = require('config');
const auth = require("./routes/auth");
const bucketList = require("./routes/bucketList");
const listItem = require("./routes/listItem");
const users = require("./routes/users");
const post = require("./routes/post");
const comment = require("./routes/comment");
const taskGroup = require("./routes/taskGroup");
var cors = require('cors');
const express = require("express");
const app = express();

if (!config.get('jwtPrivateKey')) {
  console.log('FATAL ERROR: jwtPrivateKey is not defined');
  process.exit(1);
}

const db = config.get('db');
mongoose.connect(db)
  .then(() => console.log(`Connected to db: ${db}`))
  .catch(() => console.log(`Unable to connect to db: ${db}`));

app.use(cors());
app.use(express.json());
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/bucketList', bucketList);
app.use('/api/listitem', listItem);
app.use('/api/post/', post);
app.use('/api/comment/', comment);
app.use('/api/taskGroup/', post);

const port = process.env.PORT || 3900;
const server = app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

module.exports = server;
