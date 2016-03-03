var React = require('react');
var AllStudiedStore = require('../stores/AllStudiedStore');
var AllStudiedUtils = require('../util/AllStudiedUtils');
var Panel = require('react-bootstrap').Panel;
var Grid = require('react-bootstrap').Grid;
var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;


var AllStudiedDropdown = React.createClass({
  getInitialState: function () {
    return {allStudied: [], open: true};
  },

  update: function () {
    this.setState({allStudied: AllStudiedStore.getAllStudied()});
  },

  componentDidMount: function () {
    this.listener = AllStudiedStore.addListener(this.update);
    AllStudiedUtils.fetchAllStudied();
  },

  componentWillUnmount: function () {
    this.listener.remove();
  },

  render: function() {
    var listofStudied = this.state.allStudied.map( function (char, idx) {
      return <Col className="character-block" key={char.unicode_value + idx} xs={1} md={1}><div className="character-display">{char.unicode_value.decodeHTML()}</div></Col>;
    });
    var totalCharacters = listofStudied.length;
    var idx = 0;
    var listofRows = [];
    while (idx + 6 < totalCharacters) {
      listofRows.push(
        <Row key={'allstudied' + idx}>{listofStudied.slice(idx, idx + 6)}</Row>
      );
      idx = idx + 6;
    }
    listofRows.push(
      <Row key={'allstudied' + idx}>{listofStudied.slice(idx)}</Row>
    );
    return (
      <div>
        <Panel className="dropdown-click" onClick={ ()=> this.setState({ open: !this.state.open })}>Characters Studied
        </Panel>
        <Panel collapsible expanded={this.state.open}>
            <Grid>
              {listofRows}
            </Grid>
        </Panel>
      </div>
    );
  }

});

module.exports = AllStudiedDropdown;
