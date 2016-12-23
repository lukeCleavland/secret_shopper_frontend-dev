module.exports = function(app) {
  var express = require('express');
  var categoriesRouter = express.Router();
  categoriesRouter.get('/', function(req, res) {
    res.send([{id: 0, name: 'Mock category', subcategories: [0]}]);
  });
  app.use('/api/categories', categoriesRouter);
};
