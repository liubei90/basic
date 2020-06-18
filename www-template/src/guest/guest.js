define(['exports', 'react', 'react-dom'], function(exports, React, ReactDOM) {
  'use strict';
  const e = React.createElement;
  class Guest extends React.Component {
    constructor(props) {
      super(props);
      this.state = { };
    }
    render() {
      return (
        <div>
          这是广告ke
        </div>
      )
    }
  }

  exports.Guest = Guest
})
