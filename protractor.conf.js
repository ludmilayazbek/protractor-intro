exports.config = {
    allScriptsTimeout: 11000,
    framework: 'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework'),
    seleniumAddress: 'http://172.20.148.138:4444/wd/hub',
    capabilities: {
        browserName: 'chrome',
        proxy: {
            proxyType: 'manual',
            httpProxy: 'http://proxylatam.indra.es:8080',
            httpsProxy: 'http://proxylatam.indra.es:8080',
            sslProxy: 'http://proxylatam.indra.es:8080'
        },
        chromeOptions: {
            args: ['--no-sandbox', '--headless', '--disable-gpu', '--proxy-server=http://proxylatam.indra.es:8080']
        }
    },
    specs: [
        'src/features/*.feature'
    ],
    onPrepare: function () {
        browser.ignoreSynchronization = true;
        browser.manage().window().maximize();
    },
    afterLaunch: function () {
        const reporterJunit = require('cucumber-junit-convert');

        const optionsJunit = {
            inputJsonFile: 'src/reports/reportFiles/cucumber.json',
            outputXmlFile: 'src/reports/reportFiles/junit.xml'
        }

        reporterJunit.convert(optionsJunit);
    },
    cucumberOpts: {
        require: [
            'src/steps/*.step.js',
        ],
        format: ['json:src/reports/reportFiles/cucumber.json'],
        profile: false,
        'no-source': true
    }
}