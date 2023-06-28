const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const config = require('config');

const {
  loginRouter,
  registerRouter,
  tokenRouter
} = require('./src/routes');

const app = express();

const identityProviderConfig = config.identityProvider;
const port = identityProviderConfig.port;

// app.use(cors())
app.use(cors({
  credentials: true,
  origin: '*',
  methods: ['GET', 'POST', 'PUT']
}))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json());

app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/token', tokenRouter);

app.listen(port, '0.0.0.0', () => {
  console.log(`http://localhost:${port}`);
});