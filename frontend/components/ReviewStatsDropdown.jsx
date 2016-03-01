var React = require('react');
var AllStudiedStore = require('../stores/AllStudiedStore');
var AllStudiedUtils = require('../util/AllStudiedUtils');
var Panel = require('react-bootstrap').Panel;
var Grid = require('react-bootstrap').Grid;
var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;

var LastReviewedDropdown = React.createClass({
  getInitialState: function () {
    return {reviewStats: [], open: true};
  },

  update: function () {
    this.setState({reviewStats: AllStudiedStore.getReviewStats()});
  },

  componentDidMount: function () {
    this.listener = AllStudiedStore.addListener(this.update);
    AllStudiedUtils.fetchReviewStats();
  },

  componentWillUnmount: function () {
    this.listener.remove();
  },

  render: function() {
    var listofReviews = this.state.reviewStats.map( function (char) {
      var total = char[1].correct + char[1].incorrect
      var correct = char[1].correct || 0;
      var percentage = Math.round(correct / total * 100);
      return (<Col className="character-block" xs={1} md={1}>
      <div>{char[0].decodeHTML() + "\n" + percentage + '%'}</div>
      </Col>);
    });
    var totalCharacters = listofReviews.length;
    var idx = 0;
    var listofRows = [];
    while (idx + 6 < totalCharacters) {
      listofRows.push(
        <Row>{listofReviews.slice(idx, idx + 6)}</Row>
      );
      idx = idx + 6;
    }
    listofRows.push(
      <Row>{listofReviews.slice(idx)}</Row>
    );

    return (
      <div>
        <Panel className="dropdown-click" onClick={ ()=> this.setState({ open: !this.state.open })}>Review Session Statistics
        </Panel>
        <Panel collapsible expanded={this.state.open}>
          <Grid>
            <Row>
              {listofRows}
            </Row>
          </Grid>
        </Panel>
      </div>
    );
  }

});

module.exports = LastReviewedDropdown;
