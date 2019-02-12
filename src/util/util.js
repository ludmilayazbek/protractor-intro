const { createWriteStream } = require('fs');

function screenshot(browser, scenario, step) {
    const date = new Date()
    const formatedDate = `${date.getDay()}-${date.getMonth()}-${date.getFullYear()}-${date.getHours()}-${date.getMinutes()}`;
    const screeshotName = `./src/reports/screenshots/${scenario.pickle.name}-${step.split(' ').join('-')}-${formatedDate}.png`;
    return new Promise((resolve, reject) => {
        try {
            browser.takeScreenshot()
                .then(png => {
                    const stream = createWriteStream(screeshotName);
                    stream.write(new Buffer(png, 'base64'));
                    stream.end();
                    resolve();
                })
                .catch(error => reject(error));
        } catch (error) {
            reject(error)
        }
    });
}

module.exports = {
    screenshot
}