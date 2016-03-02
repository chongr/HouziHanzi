var React = require('react');
var PropTypes = React.PropTypes;
var LessonCharactersStore = require('../stores/LessonCharactersStore');
var CharacterUtils = require('../util/CharacterUtils');
var FlashCards = require('./FlashCards');
var QuizPrompt = require('./QuizPrompt');

String.prototype.decodeHTML = function() {
    var map = {"gt":">" /* , … */};
    return this.replace(/&(#(?:x[0-9a-f]+|\d+)|[a-z]+);?/gi, function($0, $1) {
        if ($1[0] === "#") {
            return String.fromCharCode($1[1].toLowerCase() === "x" ? parseInt($1.substr(2), 16)  : parseInt($1.substr(1), 10));
        } else {
            return map.hasOwnProperty($1) ? map[$1] : $0;
        }
    });
};

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (0 !== currentIndex) {

    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

var LessonSession = React.createClass({
  getInitialState: function () {
    return {lessonCharacters: [], mode: "FlashCards"};
  },

  componentWillReceiveProps: function (nextProps) {
    var newLessonNum = nextProps.params.id;
    CharacterUtils.fetchLesson(newLessonNum);
  },

  currentLesson: function () {
    this.setState({mode: "FlashCards", lessonCharacters: LessonCharactersStore.getCurrentLesson()});
  },

  startLessonQuiz: function () {
    this.setState({mode: "LessonQuiz"});
  },

  componentDidMount: function() {
    this.listener = LessonCharactersStore.addListener(this.currentLesson);
    CharacterUtils.fetchLesson(this.props.params.id);
  },

  componentWillUnmount: function () {
    this.listener.remove();
  },

  nextLesson: function (nextLessonNum) {
    this.setState({lessonCharacters: [], mode: "FlashCards"});
    CharacterUtils.fetchLesson(nextLessonNum);
  },

  render: function() {
    if (this.state.mode === "FlashCards") {
      this.mode = (<FlashCards addTooltip={this.props.addTooltip} lessonCharacters={this.state.lessonCharacters} flashCardsComplete={this.startLessonQuiz}></FlashCards>);
    } else if (this.state.mode === "LessonQuiz") {
      this.mode = (<QuizPrompt nextLesson={this.nextLesson} quizCharacters={shuffle(this.state.lessonCharacters)}></QuizPrompt>);
    }
    return (
      <div>
        {this.mode}
      </div>
    );
  }

});

module.exports = LessonSession;
