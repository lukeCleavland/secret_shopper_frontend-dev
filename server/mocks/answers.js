module.exports = function(app) {
  var express = require('express');
  var answersRouter = express.Router();
  answersRouter.get('/', function(req, res) {
    res.send([
      {id: 0, text: 'Strongly disagree', grade: 1},
      {id: 1, text: 'Disagree', grade: 2},
      {id: 2, text: 'Neutral', grade: 3},
      {id: 3, text: 'Agree', grade: 4},
      {id: 4, text: 'Strongly agree', grade: 5},
      {id: 5, text: 'N/A', grade: -1}
    ]);
  });
  app.use('/api/answers', answersRouter);
};
