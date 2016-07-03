import React from 'react';
import CountTo from './components/count-to';

import {ResultBox} from './result-box.js';
import {WaitingMessage} from './components/waiting-message.js';

export const Page = React.createClass({

  getInitialState: function() {
    // const fakeData = {
    //   calories: 47.24,
    //   date: "2016-07-03",
    //   distance: 1187.19,
    //   elevation: 0,
    //   intense: 0,
    //   moderate: 240,
    //   soft: 2400,
    //   steps: 1356,
    //   timezone: "Europe/London",
    //   totalcalories: 1102.25,
    // }
    return {
        data: {},
    };
  },

  componentDidMount: function() {
    const self = this;

    fetch(this.props.source)
      .then(function(response) {
        return response.json()
      })
			.then(function(json) {
        self.setState({
          data: json.body
        })
      })
			.catch(function(ex) {
        console.log('parsing failed', ex)
      })
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
