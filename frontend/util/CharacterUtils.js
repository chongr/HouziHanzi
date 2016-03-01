var CharacterActions = require("../actions/CharacterActions");

var CharacterUtils = {
  fetchCurrentLesson: function() {
    $.get('/current_lesson', function(currentLesson) {
      CharacterActions.receiveCurrentLesson(currentLesson);
    });
  },

  fetchHSKLevel: function(level) {
    $.get('/level/' + level, function(HSKLevel) {
      CharacterActions.receiveLevel(HSKLevel);
    });
  },

  fetchLesson: function(lessonNum) {
    $.get('/lessons/' + lessonNum, function(lesson) {
      CharacterActions.receiveCurrentLesson(lesson);
    });
  }
};

module.exports = CharacterUtils;
