module.exports = function(app) {
  var express = require('express');
  var assignmentsRouter = express.Router();
  assignmentsRouter.get('/', function(req, res) {
    res.send([
      {id: 0, survey: 0, shopper: 0, restaurant: 0, surveyResult: 0},
      {id: 1, survey: 1, shopper: 0, restaurant: 0, surveyResult: 1},
      {id: 2, survey: 0, shopper: 1, restaurant: 0, surveyResult: 2}
    ]);
  });
  app.use('/api/assignments', assignmentsRouter);
};
