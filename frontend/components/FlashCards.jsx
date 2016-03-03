var React = require('react');
var ReactDOM = require('react-dom');

var FlashCards = React.createClass({
  getInitialState: function () {
    return {currentCharacterIdx: 0};
  },

  nextWithEnter: function (e) {
    var key = e.which || e.keyCode;
    if (key === 13) {
      this.nextCharacter();
    }
  },

  changeWithArrows: function (e) {
    var key = e.which || e.keyCode;
    if (key === 39) {
      this.nextCharacter();
    } else if (key === 37) {
      this.prevCharacter();
    }
  },

  componentDidMount: function () {
    document.addEventListener("keypress", this.nextWithEnter);
    document.addEventListener("keydown", this.changeWithArrows);
    // this.props.addTooltip({
    //         title: 'Standalone Tooltips',
    //         text: '<h2 style="margin-bottom: 10px; line-height: 1.6">Now you can open tooltips independently!</h2>And even style them one by one!',
    //         selector: ReactDOM.findDOMNode(this.refs.pinyinInfo),
    //         position: 'bottom',
    //         event: 'hover',
    //         style: {
    //             backgroundColor: 'rgba(0, 0, 0, 0.8)',
    //             borderRadius: '0',
    //             color: '#fff',
    //             mainColor: '#ff67b4',
    //             textAlign: 'center',
    //             width: '29rem'
    //         }
    //     });
  },

  componentWillUnmount: function () {
    document.removeEventListener("keypress", this.nextWithEnter);
    document.removeEventListener("keydown", this.changeWithArrows);
  },

  nextCharacter: function () {
    if (this.state.currentCharacterIdx + 1 >= this.props.lessonCharacters.length) {
      this.props.flashCardsComplete();
    } else {
      this.setState({currentCharacterIdx: this.state.currentCharacterIdx + 1});
    }
  },

  prevCharacter: function () {
    if (this.state.currentCharacterIdx - 1 >= 0) {
      this.setState({currentCharacterIdx: this.state.currentCharacterIdx - 1});
    }
  },

  render: function() {
    var currentLessonCharacter = {};
    var toOutput = "";
    var mainTranslation = "";
    var possibleTranslations = [];
    if (this.props.lessonCharacters.length > 0) {
      currentLessonCharacter = this.props.lessonCharacters[this.state.currentCharacterIdx];
      var stringUnicode = currentLessonCharacter.unicode_value;
      var stringLength = stringUnicode.length;
      toOutput = stringUnicode.slice(0, stringLength - 1);
    }


    return (
      <div className="lesson">
        <div className="lesson-container">
          <header>
            <div className="main-info">
              <div className="character">{toOutput.decodeHTML()}</div>
              <div className="translation">{currentLessonCharacter.main_translation}</div>
            </div>
          </header>
          <div className="supplement">
            <div className="supplement-nav">
              <div className="supplement-options">Pinyin</div>
            </div>
            <div className="supplement-info">
              <div className="back arrowbutton" onClick={this.prevCharacter}></div>
              <div className="next arrowbutton" onClick={this.nextCharacter}></div>
              <div className="supplement-pinyin">
                <div className="pinyin-container">
                  <h2 ref="pinyinInfo">Pinyin</h2>
                  <div className="pinyin">{currentLessonCharacter.pinyin}</div>
                  <h2>Other Meanings</h2>
                  <div className="other-meanings">{currentLessonCharacter.other_translations}</div>
                </div>
              </div>
            </div>
            <div className="character-list">
              <div className="character-list-container">
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

});

module.exports = FlashCards;
