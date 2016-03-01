var Dispatcher = require("../dispatcher/Dispatcher")

var CharacterActions = {
  receiveCurrentLesson: function(currentLesson){
    Dispatcher.dispatch({
      actionType: "CURRENT_LESSON_RECEIVED",
      currentLesson: currentLesson
    });
  },

  receiveLevel: function(HSKLevel){
    Dispatcher.dispatch({
      actionType: "HSK_Level_RECEIVED",
      HSKLevel: HSKLevel
    });
  }
}

module.exports = CharacterActions;
