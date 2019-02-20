const { Given, When, Then, Before } = require('cucumber');
const { browser, element, by } = require('protractor');
const { expect } = require('chai');
const { screenshot } = require('../util/util');

Before(function (scenario, done) {
  global.scenarioDetails = function () {
    return scenario;
  };
  done();
});

Given('acesso a pagina do google', { timeout: 60 * 1000 }, function (done) {
  browser.get('https://www.google.com.br')
    .then(async () => {
      const title = await browser.getTitle();
      screenshot(browser)
        .then((buffer) => {
          this.attach(buffer, 'image/png');
          expect(title).be.equal('Google');
          done();
        })
        .catch((error) => done(error));
    });
});


When('realizo uma pesquisa', { timeout: 60 * 1000 }, function (done) {
  element.all(by.name('q'))
    .then(async (elements) => {
      await elements[0]
        .sendKeys('facebook')
        .then(() => {
          screenshot(browser)
            .then((buffer) => {
              this.attach(buffer, 'image/png');
              element(by.name('f'))
                .submit()
                .then(() => {
                  setTimeout(() => {
                    done();
                  }, 2000);
                })
                .catch(() => done());
            })
            .catch((error) => done(error));
        });
    });
});

Then('recebo os resultados da pesquisa', { timeout: 60 * 1000 }, function (done) {
  browser.getTitle()
    .then((title) => {
      screenshot(browser)
        .then((buffer) => {
          this.attach(buffer, 'image/png');
          expect(title).be.equal('facebook - Pesquisa Google');
          done();
        })
        .catch((error) => done(error));
    })
    .catch((error) => done(error));
});
