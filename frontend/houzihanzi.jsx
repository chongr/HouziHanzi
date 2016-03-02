var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var hashHistory = ReactRouter.hashHistory;
var LandingPage = require('./components/LandingPage');
var LessonSession = require('./components/LessonSession');
var ReviewSession = require('./components/ReviewSession');
var SiteNavBar = require('./components/SiteNavBar');

var App = React.createClass({
  getInitialState: function () {
    return {currentPage: "LandingPage"};
  },

  componentDidMount: function () {

  },

  goToCurrentLesson: function () {
    this.setState({currentPage: "LessonSession"});
  },

  render: function(){
    return (
      <div>
      <SiteNavBar></SiteNavBar>
        {this.props.children}
      </div>
    );
  }
});

var routes = (
  <Route path="/" component={App}>
    <IndexRoute component={LandingPage}>
    </IndexRoute>
    <Route path="/current_lesson/:id" component={LessonSession}>
    </Route>
    <Route path="/review_session" component={ReviewSession}>
    </Route>
  </Route>
);

document.addEventListener("DOMContentLoaded", function () {
  if (document.getElementById('content')) {
    ReactDOM.render(
      <Router history={hashHistory}>{routes}</Router>,
      document.getElementById('content')
    );
  } else if (document.getElementById('entry-page')) {

  }
});
