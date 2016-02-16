'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _electron = require('electron');

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

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
    this.scopeQuery = scopes.length > 0 ? '&scope=' + scopes.join('%2C') : '';
    this.clientId = id;
    this.clientSecret = secret;
    this.window = null;
  }

  _createClass(AuthWindow, [{
    key: 'startRequest',
    value: function startRequest(callback) {
      var _this = this;

      _electron.app.on('ready', function () {
        _this.window = new _electron.BrowserWindow({ width: 800, height: 600, 'node-integration': false });
        var authURL = 'https://github.com/login/oauth/authorize?client_id=' + _this.clientId + _this.scopeQuery;
        _this.window.loadURL(authURL);
        _this.window.webContents.on('will-navigate', function (event, url) {
          _this.handleCallback(url, callback);
        });
        _this.window.webContents.on('did-get-redirect-request', function (event, oldUrl, newUrl) {
          _this.handleCallback(newUrl, callback);
        });
        _this.window.on('close', function () {
          _this.window = null;
        }, false);
      });
    }
  }, {
    key: 'handleCallback',
    value: function handleCallback(url, callback) {
      var raw_code = /code=([^&]*)/.exec(url) || null;
      var code = raw_code && raw_code.length > 1 ? raw_code[1] : null;
      var error = /\?error=(.+)$/.exec(url);

      if (code) {
        this.requestGithubToken(this.clientId, this.clientSecret, this.scopeQuery, code, callback);
      } else if (error) {
        console.log(error);
      }
    }
  }, {
    key: 'requestGithubToken',
    value: function requestGithubToken(id, secret, scopes, code, callback) {
      _superagent2.default.post('https://github.com/login/oauth/access_token', {
        client_id: id,
        client_secret: secret,
        code: code
      }).end(function (err, response) {
        if (err) {
          callback(err);
        }

        var access_token = response.body.access_token;
        callback(response.body.access_token);
      });
    }
  }]);

  return AuthWindow;
}();

exports.default = AuthWindow;
module.exports = exports['default'];
//# sourceMappingURL=OauthGithub.js.map