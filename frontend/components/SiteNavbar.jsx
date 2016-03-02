var React = require('react');
var ReactDOM = require('react-dom');
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
    this.props.addSteps([
        {
            title: 'Welcome!',
            text: 'HouziHanzi is an application to help learn Chinese characters!' +
            ' Each lesson has five characters, and after learning each character' +
            ' it will be added to a pool of characters that may be reviewed in review sessions. ' +
            'The home page keeps track of how well you remember the characters in the review sessions.'
             + ' You may click the help button to restart the tour of this site.',
            selector: ReactDOM.findDOMNode(this.refs.helpButton),
            position: 'bottom',
            type: 'hover'
        },

        {
            title: 'Return to Home',
            text: 'Use this button to return to this page.',
            selector: ReactDOM.findDOMNode(this.refs.homeButton),
            position: 'bottom',
            type: 'hover'
        },

        {
            title: 'Start the Current Lesson',
            text: 'This button will start the next new lesson. In each lesson the characters are first displayed to study and then quizzed on.',
            selector: ReactDOM.findDOMNode(this.refs.currentLessonButton),
            position: 'bottom',
            type: 'hover'
        },

        {
            title: 'Start a Review Session',
            text: 'This button will start a new review session. Statistics from these sessions are compiled on the home page',
            selector: ReactDOM.findDOMNode(this.refs.reviewSessionButton),
            position: 'bottom',
            type: 'hover'
        },

        {
            title: 'View a Previous Lesson',
            text: 'Redo previous lessons with this dropdown menu.',
            selector: ReactDOM.findDOMNode(this.refs.lessonButton),
            position: 'bottom',
            type: 'hover'
        },

    ]);
    this.props.startJoyRide();
  },

  startTutorial: function () {
    this.props.restartJoyRide();
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
    var lessonNum = e.target.getAttribute("data-num");
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
            <Navbar.Brand ref="homeButton">
              <a href="#"><i className="fa fa-home"></i></a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav className="left-nav">
              <NavItem ref="currentLessonButton" eventKey={1} onClick={this.goToCurrentLesson}>Current Lesson</NavItem>
              <NavItem ref="reviewSessionButton" eventKey={2} onClick={this.goToReviewSession}>Review Session</NavItem>
              <NavDropdown ref="lessonButton" eventKey={3} title="Lessons" id="basic-nav-dropdown">
                <MenuItem eventKey={3.1}>HSK Level 1</MenuItem>
                <MenuItem divider />
                  {listofRows}
              </NavDropdown>
            </Nav>
            <Nav className="right-nav" pullRight>
              <NavItem eventKey={4} ref="helpButton" onClick={this.startTutorial}>Help</NavItem>
              <NavItem eventKey={1} onClick={this.goToHome}>{this.state.currentUser.email}</NavItem>
              <NavItem eventKey={2} onClick={this.logoutUser}>Logout</NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
    );
  }

});

module.exports = LandingPage;
