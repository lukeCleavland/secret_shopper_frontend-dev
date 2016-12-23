module.exports = function(app) {
  var express = require('express');
  var itemsRouter = express.Router();
  itemsRouter.get('/', function(req, res) {
    res.send([
      {id: 0, question: 0, section: 0, position: 0},
      {id: 1, question: 1, section: 0, position: 1},
      {id: 2, question: 2, section: 0, position: 2},
      {id: 3, question: 3, section: 0, position: 3},
      {id: 4, question: 4, section: 0, position: 4},
      {id: 5, question: 0, section: 1, position: 0},
      {id: 6, question: 1, section: 1, position: 1},
      {id: 7, question: 2, section: 1, position: 2},
      {id: 8, question: 3, section: 1, position: 3},
      {id: 9, question: 4, section: 1, position: 4},
      {id: 10, question: 5, section: 0, position: 5}
    ]);
  });
  app.use('/api/items', itemsRouter);
};
