import React from 'react';
import _ from 'lodash';
import CountTo from '../helpers/count-to';

import {animationSpeed} from '../settings.js';
import {animationDelay} from '../settings.js';
import {animationDuration} from '../settings.js';

const DELAY = 200;

export const ProgressMeter = React.createClass({
  getInitialState: function () {
    const GOAL = 10000;
    return {
      goal: GOAL,
      progress: 0,
    };
  },

  componentDidMount: function () {
    setTimeout(() => {
      this.setState({
        progress: _.min([100, _.min([100, (this.props.steps / this.state.goal) * 100])]),
      });
    }, DELAY);
  },

  render: function() {
    const orange = '#f44f44';
    const yellow = '#ffd32c';
    const green = '#39f167';

    let progressBarColour = green;

    if (this.state.progress < 33) {
      progressBarColour = orange;
    }
    else if (this.state.progress < 66) {
      progressBarColour = yellow;
    }

    const progressMeterStyle = {
      width: `${this.state.progress}%`,
      backgroundColor: progressBarColour,
    };

    return (
      <div className="progress-meter" style={progressMeterStyle}>
        <span className="progress-percent">
          <CountTo to={this.state.progress} speed={animationSpeed} delay={animationDelay} />
          %</span>
      </div>
    );
  },
});
