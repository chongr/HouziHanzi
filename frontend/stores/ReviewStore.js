var Store = require('flux/utils').Store;

var Dispatcher = require('../dispatcher/Dispatcher');

var _reviewCharacters = [];
var ReviewStore = new Store(Dispatcher);

var resetReview = function(reviewCharacters){
  _reviewCharacters = reviewCharacters.slice(0);
};

ReviewStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case ("REVIEW_CHARACTERS_RECEIVED"):
      resetReview(payload.reviewCharacters);
      ReviewStore.__emitChange();
      break;
  }
};

ReviewStore.getCurrentReview = function () {
  return _reviewCharacters.slice(0);
};

module.exports = ReviewStore;
