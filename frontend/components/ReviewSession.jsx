var React = require('react');
var QuizPrompt = require('./QuizPrompt');
var ReviewPrompt = require('./ReviewPrompt');
var ReviewUtils = require('../util/ReviewUtils');
var ReviewStore =require('../stores/ReviewStore');

var ReviewSession = React.createClass({
  getInitialState: function () {
    return {reviewCharacters: []};
  },

  currentReview: function () {
    this.setState({reviewCharacters: ReviewStore.getCurrentReview()});
  },

  componentDidMount: function() {
    this.listener = ReviewStore.addListener(this.currentReview);
    ReviewUtils.fetchReviewCharacters();
  },

  componentWillUnmount: function () {
    this.listener.remove();
  },

  render: function() {
    return (
      <ReviewPrompt quizCharacters={this.state.reviewCharacters}></ReviewPrompt>
    );
  }

});

module.exports = ReviewSession;
