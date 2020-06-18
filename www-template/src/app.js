require.config({
  paths: {
    "react": "./libs/react.development",
    "react-dom": "./libs/react-dom.development",
    "react-router-dom": "./libs/react-router-dom"
  }
});

require(['react', 'react-dom', 'react-router-dom', './js/advertisers/advertisers', './js/guest/guest'], function (React, ReactDOM, ReactRouterDom, adv, gue) {
  // var Router = ReactRouterDom.Router;
  var Route = ReactRouterDom.Route;
  var HashRouter = ReactRouterDom.HashRouter;

  var Advertisers = adv.Advertisers;
  var Guest = gue.Guest;
  const e = React.createElement;
  class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
    }
    render() {
      console.log('123123123....');
      return (
        <div>
          12345
          <HashRouter>
            <Route path="/adv" component={Advertisers}/>
            <Route path="/gue" component={Guest}/>
          </HashRouter>
        </div>

      )
    }
  }
  const appElm = document.querySelector('#app');
  ReactDOM.render(e(App), appElm);
  console.log('aaaaaaaa....');
});


console.log('mmmmmm....');