import React from 'react';
import CountTo from './count-to';

export const WaitingMessage = React.createClass({
  render: function() {
    return (
      <div className="page">
        <div className="error-message">
          <span className="error-message__waiting">Thinking real hard&hellip;</span>
        </div>
      </div>
    );
  }
});
