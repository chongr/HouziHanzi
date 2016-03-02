var React = require('react');
var CharacterUtils = require('../util/CharacterUtils');
var SessionUtils = require('../util/SessionUtils');
var SessionStore = require('../stores/SessionStore');
var hashHistory = require('react-router').hashHistory;
var Navbar = require('react-bootstrap').Navbar;
var Nav = require('react-bootstrap').Nav;
var NavItem = require('react-bootstrap').NavItem;
var MenuItem = require('react-bootstrap').MenuItem;
var NavDropdown = require('react-bootstrap').NavDropdown;
var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;

var LandingPage = React.createClass({
  getInitialState: function () {
    return {currentUser: {email: ""}};
  },

  componentDidMount: function () {
    this.listener = SessionStore.addListener(this.currentUser);
    SessionUtils.fetchCurrentUser();
  },

  componentWillUnmount: function () {
    this.listener.remove();
  },

  currentUser: function () {
    this.setState({currentUser: SessionStore.getCurrentUser()});
  },

  goToCurrentLesson: function () {
    hashHistory.push("/current_lesson/" + this.state.currentUser.lesson_current);
  },

  goToLesson: function (e) {
    e.preventDefault();
    var lessonNum = e.target.getAttribute("data-num")
    hashHistory.push("/current_lesson/" + lessonNum);
  },

  goToReviewSession: function () {
    hashHistory.push("/review_session");
  },

  goToHome: function () {
    hashHistory.push("/");
  },

  logoutUser: function () {
    SessionUtils.logoutCurrentUser();
    var store = window.location.host + "/users/new";
    window.location.href = "http://" + window.location.host + "/session/new";
  },

  render: function() {
    var lessonNum = this.state.currentUser.lesson_current || 1;
    var rangeto31 = Array.apply(null, Array(lessonNum + 1)).map(function (_, i) {return i;});
    rangeto31.shift();
    var that = this;
    var allButtons = rangeto31.map(function(num) {
      return (<Col xs={1} sm={1} md={1} lg={1}><MenuItem eventKey={3 + (num * 0.1)} data-num={num} onClick={that.goToLesson}>{num}</MenuItem></Col>);
    });

    var totalButtons = rangeto31.length;
    var idx = 0;
    var listofRows = [];
    while (idx + 4 < totalButtons) {
      listofRows.push(
        <Row>{allButtons.slice(idx, idx + 4)}</Row>
      );
      idx = idx + 4;
    }
    listofRows.push(
      <Row>{allButtons.slice(idx)}</Row>
    );

    return (
        <Navbar className="container-navbar" inverse>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#"><i className="fa fa-home"></i></a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav className="left-nav">
              <NavItem eventKey={1} onClick={this.goToCurrentLesson}>Current Lesson</NavItem>
              <NavItem eventKey={2} onClick={this.goToReviewSession}>Review Session</NavItem>
              <NavDropdown eventKey={3} title="Lessons" id="basic-nav-dropdown">
                <MenuItem eventKey={3.1}>HSK Level 1</MenuItem>
                <MenuItem divider />
                  {listofRows}
              </NavDropdown>
            </Nav>
            <Nav className="right-nav" pullRight>
              <NavItem eventKey={1} onClick={this.goToHome}>{this.state.currentUser.email}</NavItem>
              <NavItem eventKey={2} onClick={this.logoutUser}>Logout</NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
    );
  }

});

module.exports = LandingPage;
