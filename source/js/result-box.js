import React from 'react';
import CountTo from './components/count-to';

import {Distance} from './components/distance.js';
import {Steps} from './components/steps.js';
import {Calories} from './components/calories.js';
import {ProgressMeter} from './components/progress-meter.js';
import {TimeStamp} from './components/timestamp.js';
import {dateForApp} from './date.js';

export const ResultBox = React.createClass({

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
