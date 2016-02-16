# electron-oauth-github example

[Register you app](https://github.com/settings/developers). You need **Client ID** and **Client Key**.

`index.js`
```javascript
var dialog = require('electron').dialog;

var OauthGithub = require('electron-oauth-github');

var github = new OauthGithub({
  id: '****',
  secret: '****',
  scopes: ['user:email', 'notifications'],
});

github.startRequest(function(access_token, err) {
  if (err) {
    console.error(err);
  }

  dialog.showErrorBox('Satus', 'access_token: ' + access_token);
});
```

## Usage
```
$ npm install
$ npm start
```
