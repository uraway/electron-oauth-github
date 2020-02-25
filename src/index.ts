import assert from "assert";
import { app, BrowserWindow } from "electron";
import request from "superagent";

export default class OauthWindow {
                 scopes: string[];
                 clientId: string;
                 clientSecret: string;
                 window: BrowserWindow;
                 callback: null | Function

                 constructor({ id, secret, scopes = [] }) {
                   assert(id, "Client ID is needed!");
                   assert(secret, "Client Secret is needed!");
                   this.scopes = scopes;
                   this.clientId = id;
                   this.clientSecret = secret;
                   this.window = null;
                   this.callback = null;
                 }

                 startRequest(callback) {
                   this.callback = callback;
                   app.on("ready", () => {
                     this.window = new BrowserWindow({
                       width: 800,
                       height: 600,
                       webPreferences: { nodeIntegration: false }
                     });
                     var authURL =
                       "https://github.com/login/oauth/authorize?client_id=" +
                       this.clientId +
                       "&scope=" +
                       this.scopes;
                     this.window.loadURL(authURL);
                     this.window.show();
                     this.window.webContents.on(
                       "will-navigate",
                       (event, url) => {
                         this.handleCallback(url);
                       }
                     );
                     this.window.on(
                       "close",
                       () => {
                         this.window = null;
                       },
                     );
                   });
                 }

                 handleCallback(url) {
                   var raw_code = /code=([^&]*)/.exec(url) || null;
                   var code =
                     raw_code && raw_code.length > 1 ? raw_code[1] : null;
                   var error = /\?error=(.+)$/.exec(url);
                   if (code) {
                     this.requestGithubToken(code);
                   } else if (error) {
                     alert(
                       "Oops! Something went wrong and we couldn't" +
                         "log you in using Github. Please try again."
                     );
                   }
                 }

                 requestGithubToken(code) {
                   request
                     .post("https://github.com/login/oauth/access_token")
                     .send({
                       client_id: this.clientId,
                       client_secret: this.clientSecret,
                       code: code
                     })
                     .end((err, response) => {
                       this.window.destroy();
                       if (err) {
                         this.callback(err);
                       }
                       var access_token = response.body.access_token;
                       this.callback(response.body.access_token);
                     });
                 }
               }
