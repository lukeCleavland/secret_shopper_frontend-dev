module.exports = function(app) {
  var express = require('express');
  var shoppersRouter = express.Router();
  shoppersRouter.get('/', function(req, res) {
    res.send([
      {id: 0,  email: 'fake.email@internet.com'},
      {id: 1,  email: 'another.fake.email@internet.com'}
    ]);
  });
  app.use('/api/shoppers', shoppersRouter);
};
