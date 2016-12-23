module.exports = function(app) {
  var express = require('express');
  var responsesRouter = express.Router();
  responsesRouter.get('/', function(req, res) {
    res.send([
      {id: 0, question: 0, answer: 0, comment: '', position: 0},
      {id: 1, question: 1, answer: 1, comment: '', position: 1},
      {id: 2, question: 2, answer: 2, comment: '', position: 2},
      {id: 3, question: 3, answer: 3, comment: '', position: 3},
      {id: 4, question: 4, answer: 0, comment: '', position: 4},
      /* New Survey Result */
      {id: 5, question: 0, answer: 4, comment: '', position: 0},
      {id: 6, question: 1, answer: 4, comment: '', position: 1},
      {id: 7, question: 2, answer: 4, comment: '', position: 2},
      {id: 8, question: 3, answer: 4, comment: '', position: 3},
      {id: 9, question: 4, answer: 4, comment: '', position: 4},
      /* New Survey Result */
      {id: 10, question: 0, answer: 4, comment: '', position: 0},
      {id: 11, question: 1, answer: 4, comment: '', position: 1},
      {id: 12, question: 2, answer: 4, comment: '', position: 2},
      {id: 13, question: 3, answer: 4, comment: '', position: 3},
      {id: 14, question: 4, answer: 4, comment: '', position: 4},
      /* Adding 2 Open-Ended answers, one for Survey Result ID 0 & Survey Result ID 2*/
      {id: 15, question: 5, answer: null, comment: 'Here are my thoughts on the experience!', position: 5},
      {id: 16, question: 5, answer: null, comment: 'And here are my thoughts. They are here.', position: 5}
    ]);
  });
  app.use('/api/responses', responsesRouter);
};
