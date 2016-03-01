var Store = require('flux/utils').Store;

var Dispatcher = require('../dispatcher/Dispatcher');

var _User = null;
var SessionStore = new Store(Dispatcher);

var resetUser = function(User){
  _User = User;
};

var logoutUser = function() {
  _User = {email: ""};
};

SessionStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case ("CURRENT_USER_RECEIVED"):
      resetUser(payload.currentUser);
      SessionStore.__emitChange();
      break;
    case ("CURRENT_USER_LOGGEDOUT"):
      logoutUser();
      SessionStore.__emitChange();
      break;
    case ("CURRENT_USER_UPDATED"):
      resetUser(payload.updatedUser);
      SessionStore.__emitChange();
      break;
  }
};

SessionStore.getCurrentUser = function () {
  return _User;
};

module.exports = SessionStore;
