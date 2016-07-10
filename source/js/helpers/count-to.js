import React from 'react';

const CountTo = React.createClass({

  propTypes: {
    from: React.PropTypes.number,
    to: React.PropTypes.number.isRequired,
    speed: React.PropTypes.number.isRequired,
    delay: React.PropTypes.number,
    onComplete: React.PropTypes.func,
    digits: React.PropTypes.number,
    className: React.PropTypes.string,
		formatFn: React.PropTypes.func,
  },

  getInitialState() {
    return {
      counter: this.props.from || 0,
			fn: this.props.formatFn || function (x) { return ~~(x) },
    };
  },

  componentDidMount() {
    this.start(this.props);
  },

  componentWillReceiveProps(nextProps) {
    this.start(nextProps);
  },

  componentWillUnmount() {
    this.clear();
  },

  start(props) {
    this.clear();
    this.setState(this.getInitialState(), () => {
      const delay = this.props.delay || 100;
      this.loopsCounter = 0;
      this.loops = Math.ceil(props.speed / delay);
      this.increment = (props.to - this.state.counter) / this.loops;
      this.interval = setInterval(this.next.bind(this, props), delay);
    });
  },

  next(props) {
    if (this.loopsCounter < this.loops) {
      this.loopsCounter++;
      this.setState({
        counter: this.state.counter + this.increment
      });
    } else {
      this.clear();
      if (props.onComplete) {
        props.onComplete();
      }
    }
  },

  clear() {
    clearInterval(this.interval);
  },

  render() {
    return (
      <span className={this.props.className}>
        {this.state.fn(this.state.counter)}
      </span>
    );
  }

});

export default CountTo;
