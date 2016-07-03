import Test from './test-2';
import React from 'react';
import ReactDOM from 'react-dom';

var Example = React.createClass({
  render: function() {
    return (
      <span>Works?</span>
    )
  }
});
ReactDOM.render(<Example />, document.getElementById('app'));
