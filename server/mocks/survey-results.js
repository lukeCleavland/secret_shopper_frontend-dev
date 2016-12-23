module.exports = function(app) {
  var express = require('express');
  var surveyResultsRouter = express.Router();
  surveyResultsRouter.get('/', function(req, res) {
    res.send([
      {id: 0, completedDate: '2014-12-01T23:59:59-06:00', shopper: 0, responseGroups: [0], survey: 0},
      {id: 1, completedDate: '2014-12-02T23:59:59-06:00', shopper: 0, responseGroups: [1], survey: 1},
      {id: 2, completedDate: '2014-12-03T23:59:59-06:00', shopper: 1, responseGroups: [2], survey: 0}
    ]);
  });
  app.use('/api/survey_results', surveyResultsRouter);
};
