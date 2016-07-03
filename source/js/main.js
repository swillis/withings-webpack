import React from 'react';
import ReactDOM from 'react-dom';
import CountTo from './helpers/count-to';

import {ActivityUrl} from './helpers/get-withings-url.js';
import {Results} from './results.js';
import {WaitingMessage} from './components/waiting-message.js';

export const Page = React.createClass({
  getInitialState: function() {
    return {
      data: {},
    };
  },

  componentDidMount: function() {
    const self = this;

    fetch(this.props.source)
      .then(function(response) {
        return response.json()
      })
			.then(function(json) {
        self.setState({
          data: json.body
        })
      })
			.catch(function(ex) {
        console.log('parsing failed', ex)
      })
  },

  render: function() {
    if (_.isEmpty(this.state.data)) {
      return (
        <div>
          <WaitingMessage />
        </div>
      )
    }
    else {
      return (
        <div>
          <Results steps={ this.state.data.steps } distance={ this.state.data.distance } calories={ this.state.data.calories } totalCalories={ this.state.data.totalcalories }/>
        </div>
      );
    }
  }
});

ReactDOM.render(
  <Page source={ActivityUrl}/>,
  document.getElementById('app')
);
