var Dispatcher = require("../dispatcher/Dispatcher");

var SessionActions = {
  receiveCurrentUser: function(currentUser){
    Dispatcher.dispatch({
      actionType: "CURRENT_USER_RECEIVED",
      currentUser: currentUser
    });
  },

  logoutCurrentUser: function(currentUser){
    Dispatcher.dispatch({
      actionType: "CURRENT_USER_LOGGEDOUT",
      currentUser: currentUser
    });
  },

  updateCurrentUser: function (updatedUser) {
    Dispatcher.dispatch({
      actionType: "CURRENT_USER_UPDATED",
      updatedUser: updatedUser
    });
  }

};

module.exports = SessionActions;
