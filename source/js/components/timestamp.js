import React from 'react';
import CountTo from '../helpers/count-to';

export const TimeStamp = React.createClass({
  render: function() {
    return (
      <span className="timestamp">Activity for {this.props.date}</span>
    );
  }
});
