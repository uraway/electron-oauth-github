var OauthGithub = require('../lib/OauthGithub');

var github = new OauthGithub({
  id: process.env.GH_CLIENT_ID,
  secret: process.env.GH_CLIENT_SECRET,
  scopes: ['user:email', 'notifications'],
});

github.startRequest(function(access_token, err) {
  if (err) {
    console.error(err);
  }

  console.log(access_token);
});
