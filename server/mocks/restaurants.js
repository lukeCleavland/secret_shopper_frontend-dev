module.exports = function(app) {
  var express = require('express');
  var restaurantsRouter = express.Router();
  restaurantsRouter.get('/', function(req, res) {
    var restaurants = [
      {name: 'Hubbard Avenue Diner', id: 0, assignments: [0,1,2]},
      {name: 'Bluephie\'s Vodkatorium', id: 1, assignments: []}];
    res.send(restaurants);
  });
  app.use('/api/restaurants', restaurantsRouter);
};
