import React from 'react';
import withingsApi from 'withings-api';
import jquery from 'jquery';
import ReactDOM from 'react-dom';
import jqueryNumerator from 'jquery-numerator';
import _ from 'lodash';

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

    $('.distance').numerator({
      duration: numeratorDuration,
      toValue: floorDistance,
      delimiter: ','
    })

    return (
      <div className="result">
        <div className="label">
          <span>Distance</span>
        </div>

        <div className="value">
          <span className="distance">0</span><span className="unit">m</span>
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
    $('.steps').numerator({
      duration: numeratorDuration,
      toValue: (this.props.steps),
      delimiter: ','
    })

    return (
      <div className="result primo">
        <div className="label">
          <span>Steps</span>
        </div>

        <div className="value">
          <span className="steps">0</span>
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

    $('.calories').numerator({
      duration: numeratorDuration,
      toValue: floorCalories,
      delimiter: ','
    })

    return (
      <div className="result">
        <div className="label">
          <span>Calories</span>
        </div>

        <div className="value">
          <span className="calories">0</span><span className="unit">kcal</span>
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

    // Numeratorrr
    $('.progress-percent-value').numerator({
      duration: numeratorDuration,
      toValue: progressBarPercentage,
      delimiter: ','
    })

    // Progress bar stylez
    var divStyle = {
      transform: 'translateX(-' + (100 - progressBarPosition) + '%)',
      'backgroundColor': progressBarColour
    };

    return (
      <div className="progress-meter" style={divStyle}>
        <span className="progress-percent"><span className="progress-percent-value"></span>%</span>
      </div>
    );
  }
});

// Results container
var ResultBox = React.createClass({
  getInitialState: function() {
    return {
      steps: '0',
      distance: '0',
      calories: '0',
      totalCalories: '0',
    };
  },

  componentDidMount: function() {
    $.get(this.props.source, function(result) {
      var urlResults = result;
      if (this.isMounted()) {
        this.setState({
          body: urlResults.body,
          steps: urlResults.body.steps,
          distance: urlResults.body.distance,
          calories: urlResults.body.calories,
          totalCalories: urlResults.body.totalcalories,
        });
      }
    }.bind(this));
  },

  render: function() {
    return (
      <div className="page">
        <Distance distance={this.state.distance}
        steps={this.state.steps}/>

        <Steps steps={this.state.steps}/>

        <Calories calories={this.state.calories}
        totalCalories={this.state.totalCalories}/>

        <TimeStamp date={dateForApp}/>

        <ProgressMeter steps={this.state.steps}/>
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
    return {
        body: {},
    };
  },

  componentDidMount: function() {
    $.get(this.props.source, function(result) {
      var urlResults = result;
      if (this.isMounted()) {
        this.setState({
          body: urlResults.body,
        });
      }
    }.bind(this));
  },

  render: function() {
    if (_.isEmpty(this.state.body)) {
      return (
        <div>
          <WaitingMessage />
        </div>
      )
    }
    else {
      return (
        <div>
          <ResultBox source={activityUrl}/>
        </div>
      );
    }
  }
});

ReactDOM.render(
  <Page source={activityUrl}/>,
  document.getElementById('app')
);
