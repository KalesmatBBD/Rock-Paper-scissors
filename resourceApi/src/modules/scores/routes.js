const scoresRouter = require('express').Router();
const {
  scoresService,
} = require('./scores.service');

scoresRouter.get('', (req, res) => {
  res.status(200).json({})
});

scoresRouter.post('', (req, res) => {
  res.status(200).json({})
});

module.exports = {
  scoresRouter
}