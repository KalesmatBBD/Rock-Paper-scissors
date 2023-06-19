const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require("body-parser");
const config = require('config');

const {
  loginRouter,
} = require('./src/routes');

const app = express();
const identityProviderConfig = config.identityProvider;
const port = identityProviderConfig.port;


app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json());

app.use('/login', loginRouter);

app.listen(port, '0.0.0.0', () => {
  console.log(`http://localhost:${port}`);
});