module.exports = function(app) {
  var express = require('express');
  var scalesRouter = express.Router();
  scalesRouter.get('/', function(req, res) {
    res.send([{id: 0, name: 'Mock 5-point scale', answers: [0,1,2,3,4,5]}]);
  });
  app.use('/api/scales', scalesRouter);
};
