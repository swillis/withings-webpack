import React from 'react';
import CountTo from './helpers/count-to';

import {Distance} from './components/distance.js';
import {Steps} from './components/steps.js';
import {Calories} from './components/calories.js';
import {ProgressMeter} from './components/progress-meter.js';
import {TimeStamp} from './components/timestamp.js';
import {dateForApp} from './date.js';

export const Results = React.createClass({

  render: function() {
    return (
      <div className="page">
				<TimeStamp date={dateForApp}/>
				<Distance distance={this.props.distance} steps={this.props.steps}/>
	      <Steps steps={this.props.steps}/>
        <Calories calories={this.props.calories} totalCalories={this.props.totalCalories}/>
        <ProgressMeter steps={this.props.steps}/>
      </div>
    );
  }
});
