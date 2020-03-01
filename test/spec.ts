// ref: https://stackoverflow.com/questions/42813924/test-electron-app-with-spectron-and-travis/46014689
import { Application } from 'spectron';
import * as electronPath from 'electron';

const assert = require('assert');
const path = require('path');
const fs = require('fs');

describe('Application launch', function() {
    this.timeout(10000);

    let app: Application;

    const saveErrorScreenshot = function<T>(e): T {
        const filename = `ErrorScreenshot-${this.test.title}-${new Date().toISOString()}.png`
            .replace(/\s/g, '_')
            .replace(/:/g, '');
        app.browserWindow.capturePage().then(imageBuffer => {
            fs.writeFile(`./tmp/${filename}`, imageBuffer, error => {
                if (error) throw error;

                console.info(`Screenshot saved: ${process.cwd()}/tmp/${filename}`);
            });
        });
        throw e;
    };

    beforeEach(function() {
        app = new Application({
            // Your electron path can be any binary
            // i.e for OSX an example path could be '/Applications/MyApp.app/Contents/MacOS/MyApp'
            // But for the sake of the example we fetch it from our node_modules.
            path: '' + electronPath,

            // Assuming you have the following directory structure

            //  |__ my project
            //     |__ ...
            //     |__ main.js
            //     |__ package.json
            //     |__ index.html
            //     |__ ...
            //     |__ test
            //        |__ spec.js  <- You are here! ~ Well you should be.

            // The following line tells spectron to look and use the main.js file
            // and the package.json located 1 level above.
            args: [path.join(__dirname, '..', 'example')],
        });
        return app.start();
    });

    afterEach(function() {
        if (app && app.isRunning()) {
            return app.stop();
        }
    });

    it('shows an initial window', function() {
        return app.client
            .getWindowCount()
            .then(count => {
                assert.equal(count, 1);
                // Please note that getWindowCount() will return 2 if `dev tools` are opened.
                // assert.equal(count, 2)
            })
            .catch(saveErrorScreenshot.bind(this));
    });

    // it('should store a screenshot', function () {
    //     return app.client
    //       .then(() => app.client.getText('Non exsit text'))
    //       .catch(saveErrorScreenshot.bind(this))
    // })
});
