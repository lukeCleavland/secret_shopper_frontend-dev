module.exports = function(app) {
  var express = require('express');
  var sectionsRouter = express.Router();
  sectionsRouter.get('/', function(req, res) {
    res.send([
      {id: 0, subcategory: 0, position: 0, items: [0,1,2,3,4,10]},
      {id: 1, subcategory: 0, position: 1, items: [5,6,7,8,9]}
    ]);
  });
  app.use('/api/sections', sectionsRouter);
};
