import React from 'react';
import CountTo from '../helpers/count-to';

import {animationSpeed} from '../settings.js';
import {animationDelay} from '../settings.js';
import {animationDuration} from '../settings.js';
import {number} from '../helpers/format'

var goal = 10000;

export const Calories = React.createClass({
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
            <CountTo formatFn={ number } to={floorCalories} speed={animationSpeed} delay={animationDelay} />
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
