import React from 'react';
import withingsApi from 'withings-api';
import ReactDOM from 'react-dom';
import Fetch from 'whatwg-fetch';
import _ from 'lodash';
import CountTo from 'react-count-to';

// Get the todays's date
let today = new Date();
let dd = today.getDate();
let mm = today.getMonth()+1; //January is 0!
let yyyy = today.getFullYear();

if (dd<10) {
  dd='0'+dd
}
if (mm<10) {
  mm='0'+mm
}

var dateForWithings = yyyy+'-'+mm+'-'+dd;
// var dateForWithings = '2016-06-30';
var dateForApp = dd+'.'+mm+'.'+yyyy;
var numeratorDuration = 500;

// Get the activity log from Withings
var activityUrl = withingsApi.generateUrl({
  url: "http://wbsapi.withings.net/v2/measure",

  parameters: {
    action: "getactivity",
    userid: "8680483",
    date: dateForWithings,
  },

  consumer_key: "8536748c0d33794f647c6448f765b7682e4f820e49718153246be40bfbc683",
  consumer_secret: "2889eb3c8e43ecc9d03207219ef2e6fb52ce49d3c7b08de37294f2d390fd",
  access_token: "c288268c2d2318eb62fe23ffed11038e10f122885c66367e3b26e9c429",
  access_token_secret: "9e7d5e43e2ee399c5988190cdfe67d45107b413887b152080def30184d466ec"
});

// Have to hard code goal!!
var goal = 10000;

// Timestamp
var TimeStamp = React.createClass({
  render: function() {
    return (
      <span className="timestamp">Activity for {this.props.date}</span>
    );
  }
});

// Distance
var Distance = React.createClass({
  render: function() {
    var floorDistance = Math.floor(this.props.distance);
    var stepsInMeters = ((floorDistance) / (this.props.steps));
    var distanceGoal = (Math.floor((stepsInMeters) * (goal)));

    // $('.distance').numerator({
    //   duration: numeratorDuration,
    //   toValue: floorDistance,
    //   delimiter: ','
    // })

    return (
      <div className="result">
        <div className="label">
          <span>Distance</span>
        </div>

        <div className="value">
          <span className="distance">
            <CountTo to={floorDistance} speed={1000} delay={50} />
          </span>
          <span className="unit">m</span>
        </div>

        <div className="goal">
          <span className="">Goal: {distanceGoal}</span><span className="small-unit">m</span>
        </div>
      </div>
    );
  }
});

// Steps
var Steps = React.createClass({
  render: function() {

    return (
      <div className="result primo">
        <div className="label">
          <span>Steps</span>
        </div>

        <div className="value">
          <span className="steps">
            <CountTo to={this.props.steps} speed={1000} delay={50} />
          </span>
        </div>

        <div className="goal">
          <span className="">Goal: {goal}</span>
        </div>
      </div>
    );
  }
});

// Calories
var Calories = React.createClass({
  render: function() {
    var floorTotalCalories = Math.floor(this.props.totalCalories);
    var floorCalories = Math.floor(this.props.calories);

    return (
      <div className="result">
        <div className="label">
          <span>Calories</span>
        </div>

        <div className="value">
          <span className="calories">
            <CountTo to={floorCalories} speed={1000} delay={50} />
          </span>
          <span className="unit">kcal</span>
        </div>

        <div className="goal">
          <span className="">Total calories: {floorTotalCalories}</span><span className="small-unit">kcal</span>
        </div>
      </div>
    );
  }
});

var ProgressMeter = React.createClass({
  render: function() {
    var steps = (this.props.steps);
    var progress = (steps / goal) * 100;
    var progressBarPercentage = Math.floor(progress);

    if (progressBarPercentage <= 100) {
      var progressBarPosition = Math.floor(progress);
    }
    else {
      var progressBarPosition = 100;
    }

    // Set progress bar colour
    const orange = '#F1743E';
    const yellow = '#FFD32C';
    const green = '#39F167';

    let progressBarColour = green;

    if (progressBarPercentage < 33) {
      progressBarColour = orange;
    }
    else if (progressBarPercentage < 66) {
      progressBarColour = yellow;
    }

    // Progress bar stylez
    var divStyle = {
      transform: 'translateX(-' + (100 - progressBarPosition) + '%)',
      'backgroundColor': progressBarColour
    };

    return (
      <div className="progress-meter" style={divStyle}>
        <span className="progress-percent"><span className="progress-percent-value">
          <CountTo to={progressBarPercentage} speed={1000} delay={50} />
        </span>%</span>
      </div>
    );
  }
});

// Results container
var ResultBox = React.createClass({

  render: function() {
    return (
      <div className="page">
        <Distance distance={this.props.distance}
        steps={this.props.steps}/>

      <Steps steps={this.props.steps}/>

        <Calories calories={this.props.calories}
        totalCalories={this.props.totalCalories}/>

        <TimeStamp date={dateForApp}/>

        <ProgressMeter steps={this.props.steps}/>
      </div>
    );
  }
});

var WaitingMessage = React.createClass({
  render: function() {
    return (
      <div className="page">
        <div className="error-message">
          <span className="error-message__waiting">Think real hard&hellip;</span>
        </div>
      </div>
    );
  }
});


var ErrorMessage = React.createClass({
  render: function() {
    return (
      <div className="page">
        <div className="error-message">
          <span className="error-message__emoji">😬</span>
          <span className="error-message__title">Ruh roh</span>
          <span className="error-message__copy">Couldn’t get your activity from the Withings API. You probs just need to make sure your watch is synced up and that you’ve got internet.</span>
          <a href="." className="error-message__link">Try reloading the page</a>
        </div>
      </div>
    );
  }
});

var Page = React.createClass({

  getInitialState: function() {
    const fakeData = {
      calories: 47.24,
      date: "2016-07-03",
      distance: 1187.19,
      elevation: 0,
      intense: 0,
      moderate: 240,
      soft: 2400,
      steps: 1356,
      timezone: "Europe/London",
      totalcalories: 1102.25,
    }
    return {
        data: fakeData,
    };
  },

  componentDidMount: function() {
    const self = this;

    // fetch(this.props.source)
    //   .then(function(response) {
    //     return response.json()
    //   }).then(function(json) {speed
    //     self.setState({
    //       data: json.body
    //     })
    //   }).catch(function(ex) {
    //     console.log('parsing failed', ex)
    //   })
  },

  render: function() {
    if (_.isEmpty(this.state.data)) {
      return (
        <div>
          <WaitingMessage />
        </div>
      )
    }
    else {
      return (
        <div>
          <ResultBox steps={ this.state.data.steps } distance={ this.state.data.distance } calories={ this.state.data.calories } totalCalories={ this.state.data.totalcalories }/>
        </div>
      );
    }
  }
});

ReactDOM.render(
  <Page source={activityUrl}/>,
  document.getElementById('app')
);
