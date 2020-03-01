const OauthGithub = require('../lib');

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
