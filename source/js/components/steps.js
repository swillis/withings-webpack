import React from 'react';
import CountTo from './count-to';

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
            <CountTo formatFn={ number } to={this.props.steps} speed={1000} delay={25} />
          </span>
        </div>

        <div className="goal">
          <span className="">Goal: {goal}</span>
        </div>
      </div>
    );
  }
});
