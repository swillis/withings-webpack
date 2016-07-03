import React from 'react';
import CountTo from '../helpers/count-to';

export const ErrorMessage = React.createClass({
  render: function() {
    return (
      <div className="page">
        <div className="error-message">
          <span className="error-message__emoji">😬</span>
          <span className="error-message__title">Ruh roh</span>
          <span className="error-message__copy">Couldn’t get your activity from the Withings API. You probs just need to make sure your watch is synced up and that you’ve got internet.</span>
          <a href="." className="error-message__link">Try reloading the page</a>
        </div>
      </div>
    );
  }
});
