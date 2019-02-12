exports.config = {
    framework: 'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework'),
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