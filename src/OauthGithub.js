'use strict';

import assert from 'assert';
import { app, BrowserWindow } from 'electron';
import request from 'superagent';

export default class AuthWindow {
  constructor({ id, secret, scopes = [] }) {
    assert(id, 'Client ID is needed!');
    assert(secret, 'Client Secret is needed!');
    this.scopeQuery = scopes.length > 0 ? '&scope=' + scopes.join('%2C') : '';
    this.clientId = id;
    this.clientSecret = secret;
    this.window = null;
  }

  startRequest(callback) {
    app.on('ready', () => {
      this.window = new BrowserWindow({ width: 800, height: 600, 'node-integration': false });
      var authURL = 'https://github.com/login/oauth/authorize?client_id=' + this.clientId + this.scopeQuery;
      this.window.loadURL(authURL);
      this.window.webContents.on('will-navigate', (event, url) => {
        this.handleCallback(url, callback);
      });
      this.window.webContents.on('did-get-redirect-request', (event, oldUrl, newUrl) => {
        this.handleCallback(newUrl, callback);
      });
      this.window.on('close', () => {
        this.window = null;
      }, false);
    });
  }

  handleCallback(url, callback) {
    let raw_code = /code=([^&]*)/.exec(url) || null;
    let code = (raw_code && raw_code.length > 1) ? raw_code[1] : null;
    let error = /\?error=(.+)$/.exec(url);

    if (code) {
      this.requestGithubToken(this.clientId, this.clientSecret, this.scopeQuery, code, callback);
    } else if (error) {
      console.log(error);
    }
  }

  requestGithubToken(id, secret, scopes, code, callback) {
    request.post('https://github.com/login/oauth/access_token', {
      client_id: id,
      client_secret: secret,
      code: code,
    }).end((err, response) => {
      if (err) {
        callback(err);
      }

      var access_token = response.body.access_token;
      callback(response.body.access_token);
    });
  }

}
