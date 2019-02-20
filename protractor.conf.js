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
        const reporterHtml = require('cucumber-html-reporter');
        const reporterJunit = require('cucumber-junit-convert');

        const optionsHtml = {
            brandTitle: 'Smoke Test',
            columnLayout: 1,
            name: 'Pesquisa Simples',
            theme: 'bootstrap',
            jsonFile: 'src/reports/reportFiles/cucumber.json',
            output: 'src/reports/reportFiles/chart-results.html',
            reportSuiteAsScenarios: true,
            launchReport: true,
            screenshotsDirectory: 'src/reports/screenshots/',
            storeScreenshots: true
        };

        const optionsJunit = {
            inputJsonFile: 'src/reports/reportFiles/cucumber.json',
            outputXmlFile: 'src/reports/reportFiles/junit.xml'
        }

        reporterJunit.convert(optionsJunit);
        reporterHtml.generate(optionsHtml);
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