var React = require('react');
var SessionStore = require('../stores/SessionStore');
var SessionUtils = require('../util/SessionUtils');
var ReviewUtils = require('../util/ReviewUtils');
var hashHistory = require('react-router').hashHistory;
window.ReviewUtils = ReviewUtils;

var ReviewPrompt = React.createClass({
  getInitialState: function () {
    return {currentCharacterIdx: 0, response: "", feedback: "NONE", hiddenPinyin: true, hiddenMeaning: true, elgibleForReveal: false};
  },

  resetStatusAndIncrement: function () {
    this.revealed = false;
    this.setState({currentCharacterIdx: this.state.currentCharacterIdx + 1, response: "",
       feedback: "NONE", hiddenPinyin: true, hiddenMeaning: true, elgibleForReveal: false});
  },

  nextWithEnter: function (e) {
    var key = e.which || e.keyCode;
    if ((key === 13 && this.state.feedback === "INCORRECT" && this.revealed) || this.state.feedback === "CORRECT") {
      this.nextCharacter();
    }
  },

  proceedWithClick: function (e) {
    e.preventDefault();
    if ((this.state.feedback === "INCORRECT" && this.revealed) || this.state.feedback === "CORRECT") {
      this.nextCharacter();
    }
  },

  componentWillUnmount: function () {
    document.removeEventListener("keypress", this.nextWithEnter);
  },

  componentDidMount: function () {
    this.revealed = false;
    document.addEventListener("keypress", this.nextWithEnter);
  },

  nextCharacter: function () {
    if (this.state.currentCharacterIdx + 1 >= this.props.quizCharacters.length) {
      //end review session
      hashHistory.push("/");
    } else {
      this.resetStatusAndIncrement();
    }
  },

  handleInput: function (e) {
    e.preventDefault();
    this.setState({response: e.target.value});
  },

  togglePinyin: function (e) {
    e.preventDefault();
    this.setState({hiddenPinyin: !this.state.hiddenPinyin, hiddenMeaning: true});
  },

  toggleMeaning: function (e) {
    e.preventDefault();
    if (this.state.elgibleForReveal) {
      this.revealed = true;
      this.setState({hiddenMeaning: !this.state.hiddenMeaning, hiddenPinyin: true});
    }
  },

  checkInput: function (e) {
    e.preventDefault();
    if (this.state.feedback === "CORRECT") {
      return;
    } else if (this.state.feedback === "INCORRECT" && this.revealed) {
      return;
    } else if (this.state.response === "") {
      return;
    }

    var that = this;
    var userInput = this.state.response;
    var correct = false;
    var currentCharacter = this.props.quizCharacters[this.state.currentCharacterIdx];
    var possibleTranslations = currentCharacter.other_translations.split(", ").concat([currentCharacter.main_translation]);
    console.log(possibleTranslations);

    possibleTranslations.forEach(function (translation) {
      var allwords = translation.split(" ");
      if (userInput.toLowerCase() === translation.toLowerCase() && userInput !== "") {
        correct = true;
      } else {
        allwords.forEach(function (word) {
          if (userInput.toLowerCase() === word && word !== "to" && userInput !== "") {
            correct = true;
          }
        });
      }
    });

    if (correct) {
      if (this.state.feedback === "INCORRECT") {
        return;
      }
      ReviewUtils.createReviewCharacter(currentCharacter, "true");
      this.setState({feedback: "CORRECT"});
    } else {
      if (this.state.feedback === "INCORRECT") {
        return;
      }
      ReviewUtils.createReviewCharacter(currentCharacter, "false");
      this.setState({feedback: "INCORRECT", elgibleForReveal: true});
    }

  },

  render: function() {
    var currentQuizCharacter = {};
    var toOutput = "";
    if (this.props.quizCharacters.length > 0) {
      currentQuizCharacter = this.props.quizCharacters[this.state.currentCharacterIdx];
      var stringUnicode = currentQuizCharacter.unicode_value;
      var stringLength = stringUnicode.length;
      toOutput = stringUnicode.slice(0, stringLength - 1);
    }

    var inputStyle = {};
    if (this.state.feedback === "CORRECT") {
      inputStyle = {
        backgroundColor: "#79ff4d",
        transition: "background-color 1.5s ease"
      };
    } else if (this.state.feedback === "INCORRECT") {
      inputStyle = {
        backgroundColor: "#ff3333",
        transition: "background-color 1.5s ease"
      };
    }

    var revealStyle = {};
    if (!this.state.elgibleForReveal) {
      revealStyle = {
        cursor: "not-allowed",
        opacity: 0.3
      };
    }

    var elgibleForClick = function (){};
    if (this.state.feedback !== "NONE") {
      elgibleForClick = this.proceedWithClick;
    }

    return (
        <div className="lesson">
          <div className="lesson-container">
            <header>
              <div className="main-info">
                <div className="character">{toOutput.decodeHTML()}</div>
                <div className="translation">Enter the English Translation</div>
              </div>
            </header>
            <div className="supplement">
              <div className="response-box">
                <form className="response-field-container" onSubmit={this.checkInput}>
                  <input autoFocus className="response-field" style={inputStyle} onChange={this.handleInput} value={this.state.response}></input>
                  <button type="submit" className="next-button arrowbutton" onClick={elgibleForClick}></button>
                </form>
              </div>
              <div className="quiz-button-group">
                <button type="button" className="quiz-button" onClick={this.togglePinyin}>Pinyin</button>
                <button type="button" className="quiz-button" style={revealStyle} onClick={this.toggleMeaning}>Reveal</button>
              </div>
              <div className="supplement-info" hidden={this.state.hiddenPinyin && this.state.hiddenMeaning}>
                <div className="pinyin-container" hidden={this.state.hiddenPinyin}>
                  <h2>Pinyin</h2>
                  <div className="pinyin">{currentQuizCharacter.pinyin}</div>
                </div>
                <div className="pinyin-container" hidden={this.state.hiddenMeaning}>
                  <h2>Meaning</h2>
                  <div className="other-meanings">{currentQuizCharacter.main_translation + ", " + currentQuizCharacter.other_translations}</div>
                  <div className="next-button arrowbutton" onClick={this.nextCharacter}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
  }

});

module.exports = ReviewPrompt;
