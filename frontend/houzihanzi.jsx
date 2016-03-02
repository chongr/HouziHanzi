var React = require('react');
var Joyride = require('react-joyride');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var hashHistory = ReactRouter.hashHistory;
var LandingPage = require('./components/LandingPage');
var LessonSession = require('./components/LessonSession');
var ReviewSession = require('./components/ReviewSession');
var SiteNavBar = require('./components/SiteNavbar');

var App = React.createClass({
  getInitialState: function () {
    return {
      joyrideOverlay: true,
      joyrideType: 'continuous',
      ready: false,
      steps: []
    };
  },

  startJoyRide: function () {
    this.refs.joyride.start();
  },

  stopJoyRide: function () {
    this.refs.joyride.stop();
  },

  restartJoyRide: function () {
    this.refs.joyride.restart();
  },

  clearJoyRide: function () {
    this.setState({steps: []});
  },

  _addSteps: function (steps) {
      var joyride = this.refs.joyride;

      if (!Array.isArray(steps)) {
          steps = [steps];
      }

      if (!steps.length) {
          return false;
      }

      this.setState({
          steps: this.state.steps.concat(joyride.parseSteps(steps))
      });
  },

  _addTooltip: function (data) {
      this.refs.joyride.addTooltip(data);
  },

  _stepCallback: function (step) {
      console.log('••• stepCallback', step);
  },

  _completeCallback: function (steps, skipped) {
      console.log('••• completeCallback', steps, skipped);
  },

  _onClickSwitch: function (e) {
      e.preventDefault();
      var el    = e.currentTarget,
          state = {};

      if (el.dataset.key === 'joyrideType') {
          this.refs.joyride.reset();

          setTimeout(this.refs.joyride.start, 300);

          state.joyrideType = e.currentTarget.dataset.type;
      }

      if (el.dataset.key === 'joyrideOverlay') {
          state.joyrideOverlay = el.dataset.type === 'active';
      }

      this.setState(state);
  },

  test: function () {
    return "test";
  },

  render: function(){
    return (
      <div>
        <Joyride ref="joyride" debug={true} steps={this.state.steps}
         type={this.state.joyrideType} showSkipButton={true}
         showOverlay={this.state.joyrideOverlay} stepCallback={this._stepCallback}
         completeCallback={this._completeCallback} />
       <SiteNavBar restartJoyRide={this.restartJoyRide} stopJoyRide={this.stopJoyRide} startJoyRide={this.startJoyRide} addSteps={this._addSteps} addTooltip={this._addTooltip}></SiteNavBar>
        {this.props.children}
      </div>
    );
  }
});

var LessonSessionWrapper = React.createClass({
  render: function () {
    return (
        <LessonSession lessonId={this.props.params.id} clearJoyRide={App.prototype.clearJoyRide} startJoyRide={App.prototype.startJoyRide}
           addSteps={App.prototype._addSteps} addTooltip={App.prototype._addTooltip} />
    );
  }
});

var ReviewSessionWrapper = React.createClass({
  render: function () {
    return (
        <ReviewSession clearJoyRide={App.prototype.clearJoyRide} startJoyRide={App.prototype.startJoyRide}
           addSteps={App.prototype._addSteps} addTooltip={App.prototype._addTooltip} />
    );
  }
});

var routes = (
  <Route path="/" component={App}>
    <IndexRoute component={LandingPage}>
    </IndexRoute>
    <Route path="/current_lesson/:id" component={LessonSessionWrapper}>
    </Route>
    <Route path="/review_session" component={ReviewSessionWrapper}>
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
