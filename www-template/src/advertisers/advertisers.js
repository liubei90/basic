define(['exports', 'react', 'react-dom'], function(exports, React, ReactDOM) {
  'use strict';
  const e = React.createElement;
  class Advertisers extends React.Component {
    constructor(props) {
      super(props);
      this.state = { };
    }
    render() {
      return (
        <div>
          这是广告主
        </div>
      )
    }
  }

  exports.Advertisers = Advertisers
})
