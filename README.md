# electron-oauth-github
This is Electron module that OAuth authenticates your Electron app with Github.

### Install
```
npm install electron-oauth-github
```

### Diving into OAuth
1. [Register your app](https://github.com/settings/developers)

2. Get **Client ID** and **Client Secret**

3. Set them and [scopes](https://developer.github.com/v3/oauth/#scopes). See example.

```javascript
var dialog = require('electron').dialog;

var OauthGithub = require('../lib/OauthGithub');

var github = new OauthGithub({
  id: 'bac7ea62714aff5ff712',
  secret: '9e29ee7b60a6f9cded3770ee7f9aaf1533fd95a6',
  scopes: ['user:email', 'notifications'],
});

github.startRequest(function(access_token, err) {
  if (err) {
    console.error(err);
  }

  dialog.showErrorBox('Satus', 'access_token: ' + access_token);
});
```
