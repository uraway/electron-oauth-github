# electron-oauth-github
This is Electron module that OAuth authenticates your Electron app with Github.

### Install
```
npm install electron-oauth-github
```

### Diving into OAuth
1. [Register your app](https://github.com/settings/developers)

2. Get **Client ID** and **Client Secret**

3. Set **Client ID**, **Client Secret** and [scopes](https://developer.github.com/v3/oauth/#scopes). See [example](https://github.com/uraway/electron-oauth-github/tree/master/example).

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

  console.log(access_token);
});
```

Now you have got access token. Dive into OAuth!
