var React = require('react');
var CharacterUtils = require('../util/CharacterUtils');
var SessionUtils = require('../util/SessionUtils');
var SessionStore = require('../stores/SessionStore');
var hashHistory = require('react-router').hashHistory;
var AllStudiedDropdown = require('./AllStudiedDropdown');
var LastReviewedDropdown = require('./LastReviewedDropdown.jsx');
var ReviewStatsDropdown = require('./ReviewStatsDropdown');
var SiteNavBar = require('./SiteNavbar');
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
      <div className="landing-page">
        <LastReviewedDropdown></LastReviewedDropdown>
        <ReviewStatsDropdown></ReviewStatsDropdown>
        <AllStudiedDropdown></AllStudiedDropdown>
      </div>
    );
  }

});

module.exports = LandingPage;
