import React from 'react';
import CountTo from '../helpers/count-to';

export const WaitingMessage = React.createClass({
  render: function() {
    return (
      <div className="page">
        <div className="error-message">
					<div className="loader">Loading...</div>
        </div>
      </div>
    );
  }
});
