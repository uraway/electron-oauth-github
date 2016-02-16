'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _electron = require('electron');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AuthWindow = function () {
  function AuthWindow(_ref) {
    var id = _ref.id;
    var secret = _ref.secret;
    var _ref$scopes = _ref.scopes;
    var scopes = _ref$scopes === undefined ? [] : _ref$scopes;

    _classCallCheck(this, AuthWindow);

    (0, _assert2.default)(id, 'Client ID is needed!');
    (0, _assert2.default)(secret, 'Client Secret is needed!');
    var scopeQuery = scopes.length > 0 ? '?scopes=' + scopes.join('%2C') : '';
    this.clientId = id;
    this.clientSecret = secret;
    this.window = null;
    this.resolve = null;
    this.reject = null;
  }

  _createClass(AuthWindow, [{
    key: 'startRequest',
    value: function startRequest() {
      this.window = new _electron.BrowserWindow({ width: 800, height: 600, 'node-integration': false });
      var authURL = 'https://github.com/login/oauth/authorize?' + this.clientId + scopeQuery;
      this.window.loadURL(authURL);
    }
  }]);

  return AuthWindow;
}();

exports.default = AuthWindow;
module.exports = exports['default'];
//# sourceMappingURL=GithubOauth.js.map