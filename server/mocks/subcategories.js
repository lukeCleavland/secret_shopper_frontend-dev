module.exports = function(app) {
  var express = require('express');
  var subcategoriesRouter = express.Router();
  subcategoriesRouter.get('/', function(req, res) {
    res.send([{id: 0, name: 'Mock subcategory', category: 0, questions: [0,1,2,3,4]}]);
  });
  app.use('/api/subcategories', subcategoriesRouter);
};
