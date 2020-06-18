var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
  var e = React.createElement;

  var App = function (_React$Component) {
    _inherits(App, _React$Component);

    function App(props) {
      _classCallCheck(this, App);

      var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

      _this.state = {};
      return _this;
    }

    _createClass(App, [{
      key: "render",
      value: function render() {
        console.log('123123123....');
        return React.createElement(
          "div",
          null,
          "12345",
          React.createElement(
            HashRouter,
            null,
            React.createElement(Route, { path: "/adv", component: Advertisers }),
            React.createElement(Route, { path: "/gue", component: Guest })
          )
        );
      }
    }]);

    return App;
  }(React.Component);

  var appElm = document.querySelector('#app');
  ReactDOM.render(e(App), appElm);
  console.log('aaaaaaaa....');
});

console.log('mmmmmm....');