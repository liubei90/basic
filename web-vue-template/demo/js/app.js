import React from 'react';
import ReactDom from 'react-dom';
import '../css/index.css';
import img from '../images/new-feature.png'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <div>hello, juan</div>
        <img src={img}></img>
      </div>
    )
  }
}

const appElm = document.querySelector('#app');

ReactDom.render(React.createElement(App), appElm);