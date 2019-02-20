function screenshot(browser) {
    return new Promise((resolve, reject) => {
        try {
            browser.takeScreenshot()
                .then(png => {
                    resolve(new Buffer(png, 'base64'));
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