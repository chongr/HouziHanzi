var Store = require('flux/utils').Store;

var Dispatcher = require('../dispatcher/Dispatcher');

var _lessonCharacters = [];
var LessonCharactersStore = new Store(Dispatcher);

var resetLessonCharacters = function(lessonCharacters){
  _lessonCharacters = lessonCharacters.slice(0);
}

LessonCharactersStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case ("CURRENT_LESSON_RECEIVED"):
      resetLessonCharacters(payload.currentLesson);
      LessonCharactersStore.__emitChange();
      break;
    case ("HSK_Level_RECEIVED"):
      resetLessonCharacters(payload.HSKLevel);
      LessonCharactersStore.__emitChange();
      break;
  }
};

LessonCharactersStore.getCurrentLesson = function () {
  return _lessonCharacters.slice(0);
}

module.exports = LessonCharactersStore;
