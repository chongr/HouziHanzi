var React = require('react');
var AllStudiedStore = require('../stores/AllStudiedStore');
var AllStudiedUtils = require('../util/AllStudiedUtils');
var Panel = require('react-bootstrap').Panel;
var Grid = require('react-bootstrap').Grid;
var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;

var LastReviewedDropdown = React.createClass({
  getInitialState: function () {
    return {lastReviewed: null, open: true};
  },

  update: function () {
    this.setState({lastReviewed: AllStudiedStore.getLastReviewed()});
  },

  componentDidMount: function () {
    this.listener = AllStudiedStore.addListener(this.update);
    AllStudiedUtils.fetchLastReviewed();
  },

  componentWillUnmount: function () {
    this.listener.remove();
  },

  render: function() {
    if (this.state.lastReviewed) {
      var lastReviewedCorrect = this.state.lastReviewed.correct.map( function (char, idx) {
        return <div className="flip-container"><Col className="character-block flipper" key={char.unicode_value + idx} xs={1} md={1}><div className="front"><div className="character-display">{char.unicode_value.decodeHTML()}</div></div><div className="back">{char.main_translation}</div></Col></div>;
      });
      var totalCharacters = lastReviewedCorrect.length;
      var idx = 0;
      var listofRowsCorrect = [];
      while (idx + 6 < totalCharacters) {
        listofRowsCorrect.push(
          <Row key={'lastreviewedcorrect' + idx}>{lastReviewedCorrect.slice(idx, idx + 6)}</Row>
        );
        idx = idx + 6;
      }
      listofRowsCorrect.push(
        <Row key={'lastreviewedcorrect' + idx}>{lastReviewedCorrect.slice(idx)}</Row>
      );

      var lastReviewedIncorrect = this.state.lastReviewed.incorrect.map( function (char) {
        return (<div className="flip-container">
          <Col className="character-block flipper" key={char.unicode_value + idx} xs={1} md={1}>
            <div className="front">
              <div className="character-display">{char.unicode_value.decodeHTML()}</div>
            </div>
            <div className="back">{char.main_translation}</div>
          </Col>
        </div>);
      });
      var totalCharacters = lastReviewedIncorrect.length;
      var idx = 0;
      var listofRowsIncorrect = [];
      while (idx + 6 < totalCharacters) {
        listofRowsIncorrect.push(
          <Row key={'lastreviewedincorrect' + idx}>{lastReviewedIncorrect.slice(idx, idx + 6)}</Row>
        );
        idx = idx + 6;
      }
      listofRowsIncorrect.push(
        <Row key={'lastreviewedincorrect' + idx}>{lastReviewedIncorrect.slice(idx)}</Row>
      );
    }
    return (
      <div>
        <Panel className="dropdown-click" onClick={ ()=> this.setState({ open: !this.state.open })}>Recently Reviewed Characters
        </Panel>
        <Panel collapsible expanded={this.state.open}>
          <div className="stat-header"><span>Correct</span></div>
            <Grid>
                {listofRowsCorrect}
            </Grid>
          <div className="stat-header"><span>Incorrect</span></div>
            <Grid>
                {listofRowsIncorrect}
            </Grid>
        </Panel>
      </div>
    );
  }

});

module.exports = LastReviewedDropdown;
