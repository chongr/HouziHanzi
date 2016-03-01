var AllStudiedActions = require("../actions/AllStudiedActions");

var AllStudiedUtils = {
  fetchAllStudied: function() {
    $.get('/user_stats?type=all', function(allStudied) {
      AllStudiedActions.receiveAllStudied(allStudied);
    });
  },

  fetchLastReviewed: function () {
    $.get('/user_stats?type=lastreview', function(lastReviewed) {
      AllStudiedActions.receiveLastReviewed(lastReviewed);
    });
  },

  fetchReviewStats: function () {
    $.get('/user_stats?type=reviewstats', function(reviewStats) {
      AllStudiedActions.receiveReviewStats(reviewStats);
    });
  },

};

module.exports = AllStudiedUtils;
