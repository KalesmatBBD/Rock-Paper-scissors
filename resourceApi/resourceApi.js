const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require("body-parser");
const config = require('config');

const {
  loginRouter,
  playerRouter,
  registerRouter,
  scoresRouter
} = require('./src/routes');

const app = express();
const resourceApiConfig = config.resourceApi;
const port = resourceApiConfig.port;


app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json());

app.use('/web', express.static(path.join('web')));

app.use('/login', loginRouter);
app.use('/player', playerRouter);
app.use('/register', registerRouter);
app.use('/scores', scoresRouter);

app.listen(port, '0.0.0.0', () => {
  console.log(`http://localhost:${port}`);
});