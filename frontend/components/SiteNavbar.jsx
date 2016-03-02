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

  logoutUser: function () {
    SessionUtils.logoutCurrentUser();
    var store = window.location.host + "/users/new";
    window.location.href = "http://" + window.location.host + "/session/new";
  },

  render: function() {
    var rangeto31 = Array.apply(null, Array(32)).map(function (_, i) {return i;});
    rangeto31.shift();
    var allbuttons = rangeto31.map(function(num) {

    });

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
                <MenuItem eventKey={3.2} data-num='1' onClick={this.goToLesson}>1</MenuItem>
                <MenuItem eventKey={3.3}>2</MenuItem>
                <MenuItem eventKey={3.3}>3</MenuItem>
                <MenuItem divider />
              </NavDropdown>
            </Nav>
            <Nav className="right-nav" pullRight>
              <NavItem eventKey={1}>{this.state.currentUser.email}</NavItem>
              <NavItem eventKey={2} onClick={this.logoutUser}>Logout</NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
    );
  }

});

module.exports = LandingPage;
