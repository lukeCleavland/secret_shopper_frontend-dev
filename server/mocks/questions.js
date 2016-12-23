module.exports = function(app) {
  var express = require('express');
  var questionsRouter = express.Router();
  questionsRouter.get('/', function(req, res) {
    res.send([
      {id: 0, text: 'Mock question 1 text', scale: 0, scored: true, notApplicable: false, subcategory: 0, openEnded: false},
      {id: 1, text: 'Mock question 2 text', scale: 0, scored: true, notApplicable: false, subcategory: 0, openEnded: false},
      {id: 2, text: 'Mock question 3 text', scale: 0, scored: true, notApplicable: false, subcategory: 0, openEnded: false},
      {id: 3, text: 'Mock question 4 text', scale: 0, scored: true, notApplicable: false, subcategory: 0, openEnded: false},
      {id: 4, text: 'Mock question 5 text', scale: 0, scored: true, notApplicable: false, subcategory: 0, openEnded: false},
      {id: 5, text: 'Mock question 6 (open-ended)', scale: 0, scored: false, notApplicable: false, subcategory: 0, openEnded: true}
    ]);
  });
  app.use('/api/questions', questionsRouter);
};
