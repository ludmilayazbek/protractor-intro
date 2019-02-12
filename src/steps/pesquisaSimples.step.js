const { Given, When, Then, Before } = require('cucumber');
const { browser, element, by } = require('protractor');
const chai = require('chai');
const { expect } = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const { screenshot } = require('../util/util');

Before(function (scenario, done) {
  global.scenarioDetails = function () {
    return scenario;
  };
  done();
});

Given('acesso a pagina do google', { timeout: 10 * 1000 }, function (done) {
  browser.get('http://www.google.com.br')
    .then(async () => {
      const title = await browser.getTitle();
      screenshot(browser, scenarioDetails(), 'acesso a pagina do google')
        .then(() => {
          expect(title).equal('Google');
          done();
        })
        .catch(() => done());
    });
});


When('realizo uma pesquisa', { timeout: 10 * 1000 }, function (done) {
  element.all(by.name('q'))
    .then(async (elements) => {
      await elements[0]
        .sendKeys('facebook')
        .then(() => {
          screenshot(browser, scenarioDetails(), 'realizo uma pesquisa')
            .then(() => {
              element(by.name('f'))
                .submit()
                .then(() => {
                  setTimeout(() => {
                    done();
                  }, 2000);
                })
                .catch(() => done());
            })
            .catch(() => done());
        });
    });
});

Then('recebo os resultados da pesquisa', { timeout: 10 * 1000 }, function (done) {
  browser.getTitle()
    .then(() => {
      screenshot(browser, scenarioDetails(), 'recebo os resultados da pesquisa')
        .then(() => {
          expect(title).equal('facebook - Pesquisa Google');
          done();
        })
        .catch(() => done());
    })
    .catch(() => done());
});