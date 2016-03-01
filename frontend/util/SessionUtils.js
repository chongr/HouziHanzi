var SessionActions = require("../actions/SessionActions");

var SessionUtils = {
  fetchCurrentUser: function() {
    $.get('/current_user', function(currentUser) {
      SessionActions.receiveCurrentUser(currentUser);
    });
  },

  logoutCurrentUser: function() {
    $.ajax({
      url: "/session",
      type: "DELETE",
      success: SessionActions.logoutCurrentUser,
      data: {format: 'json'},
      dataType: "json"
    });
  },

  updateCurrentUser: function () {
    $.post('/users/update_lesson', function(updatedUser) {
      SessionActions.updateCurrentUser(updatedUser);
    });
  }
};

module.exports = SessionUtils;
