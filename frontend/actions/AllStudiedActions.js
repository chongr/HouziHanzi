var Dispatcher = require("../dispatcher/Dispatcher");

var AllStudiedActions = {
  receiveAllStudied: function(allStudied){
    Dispatcher.dispatch({
      actionType: "ALL_STUDIED_RECEIVED",
      allStudied: allStudied
    });
  },

  receiveLastReviewed: function(lastReviewed){
    Dispatcher.dispatch({
      actionType: "LAST_REVIEWED_RECEIVED",
      lastReviewed: lastReviewed
    });
  },

  receiveReviewStats: function(reviewStats){
    Dispatcher.dispatch({
      actionType: "REVIEW_STATS_RECEIVED",
      reviewStats: reviewStats
    });
  }

};

module.exports = AllStudiedActions;
