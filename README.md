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
const OauthGithub = require('electron-oauth-github');

const github = new OauthGithub({
    id: process.env.GH_CLIENT_ID,
    secret: process.env.GH_CLIENT_SECRET,
    scopes: ['user:email', 'notifications'],
});

github.startRequest(function(accessToken, err) {
    if (err) {
        console.error(err);
    }

    console.log(accessToken);
});

```

Now you have got access token. Dive into OAuth!
