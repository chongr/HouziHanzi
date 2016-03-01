var ReviewActions = require("../actions/ReviewActions");

var ReviewUtils = {
  fetchReviewCharacters: function() {
    $.get('/review_characters', function(reviewCharacters) {
      ReviewActions.receiveReviewCharacters(reviewCharacters);
    });
  },

  createReviewCharacter: function(character, correct) {
    character['correct'] = correct;
    $.post('/add_reviewed_character', character, function(reviewCharacter) {
    });
  }

};

module.exports = ReviewUtils;
