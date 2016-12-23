module.exports = function(app) {
  var express = require('express');
  var surveysRouter = express.Router();
  surveysRouter.get('/', function(req, res) {
    var surveys = [
      {id: 0, name: 'Mock survey #1', flavorText: 'Mock flavor text', showSectionTitles: true, sections: [0], assignments: [0,2]},
      {id: 1, name: 'Mock survey #2', flavorText: 'Mock flavor text', showSectionTitles: true, sections: [1], assignments: [1]}
    ];
    res.send(surveys);
  });
  app.use('/api/surveys', surveysRouter);
};
