var Dispatcher = require("../dispatcher/Dispatcher");

var ReviewActions = {
  receiveReviewCharacters: function(reviewCharacters){
    Dispatcher.dispatch({
      actionType: "REVIEW_CHARACTERS_RECEIVED",
      reviewCharacters: reviewCharacters
    });
  },

};

module.exports = ReviewActions;
