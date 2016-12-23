module.exports = function(app) {
  var express = require('express');
  var responseGroupRouter = express.Router();
  responseGroupRouter.get('/', function(req, res) {
    res.send([
      {id: 0, subcategory: 0, responses: [0,1,2,3,4,15], position: 0, surveyResult: 0},
      {id: 1, subcategory: 0, responses: [5,6,7,8,9], position: 0, surveyResult: 1},
      {id: 2, subcategory: 0, responses: [10,11,12,13,14,16], position: 0, surveyResult: 2}
    ]);
  });
  app.use('/api/response_groups', responseGroupRouter);
};
