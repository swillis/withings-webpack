import React from 'react';
import CountTo from './count-to';
import {number} from '../helpers/format'

var goal = 10000;

export const Distance = React.createClass({
  render: function() {
    var floorDistance = Math.floor(this.props.distance);
    var stepsInMeters = ((floorDistance) / (this.props.steps));
    var distanceGoal = (Math.floor((stepsInMeters) * (goal)));

    return (
      <div className="result">
        <div className="label">
          <span>Distance</span>
        </div>

        <div className="value">
          <span className="distance">
            <CountTo formatFn={ number } to={floorDistance} speed={1000} delay={25} />
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
