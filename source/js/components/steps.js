import React from 'react';
import CountTo from '../helpers/count-to';

import {animationSpeed} from '../settings.js';
import {animationDelay} from '../settings.js';
import {animationDuration} from '../settings.js';

import {number} from '../helpers/format'

var goal = 10000;

export const Steps = React.createClass({
  render: function() {

    return (
      <div className="result primo">
        <div className="label">
          <span>Steps</span>
        </div>

        <div className="value">
          <span className="steps">
            <CountTo formatFn={ number } to={this.props.steps} speed={animationSpeed} delay={animationDelay} />
          </span>
        </div>

        <div className="goal">
          <span className="">Goal: {goal}</span>
        </div>
      </div>
    );
  }
});
