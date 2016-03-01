var Store = require('flux/utils').Store;

var Dispatcher = require('../dispatcher/Dispatcher');

var _allStudied = [];
var _lastReviewed = {};
var _reviewStats = [];

var AllStudiedStore = new Store(Dispatcher);

var resetAllStudied = function(allStudied){
  _allStudied = allStudied.slice(0);
};

var resetLastReviewed = function(lastReviewed){
  _lastReviewed = lastReviewed;
};

var resetReviewStats = function (reviewStats){
  _reviewStats = reviewStats.slice(0);
};

AllStudiedStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case ("ALL_STUDIED_RECEIVED"):
      resetAllStudied(payload.allStudied);
      AllStudiedStore.__emitChange();
      break;
    case ("LAST_REVIEWED_RECEIVED"):
      resetLastReviewed(payload.lastReviewed);
      AllStudiedStore.__emitChange();
      break;
    case ("REVIEW_STATS_RECEIVED"):
      resetReviewStats(payload.reviewStats);
      AllStudiedStore.__emitChange();
      break;
  }
};

AllStudiedStore.getAllStudied = function () {
  return _allStudied.slice(0);
};

AllStudiedStore.getReviewStats = function () {
  return _reviewStats.slice(0);
};

AllStudiedStore.getLastReviewed = function () {
  return _lastReviewed;
};

module.exports = AllStudiedStore;
