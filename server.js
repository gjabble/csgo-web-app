const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const path = require('path');

const cors = require('cors');

const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const passport = require("passport");
const users = require("./routes/api/users");

app.use(cors({
  origin: '*',
  optionsSuccessStatus: 200,
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const db = require("./config/keys").mongoURI;

mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));


app.use(passport.initialize());
require("./config/passport")(passport);
app.use("/api/users", users);

app.use(express.static(path.join(__dirname, 'build')));
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => console.log(`Listening on port ${port}`));

