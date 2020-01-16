const {Builder, By, Key, until} = require('selenium-webdriver');
const chromedriver = require('chromedriver');

const LOGIN_PAGE_URL = "https://www.guiabolso.com.br/web/#/login";

function addTransactions(email, password) {
    
    (async function example() {
        let driver = await new Builder().forBrowser('chrome').build();
        try {
            await driver.get(LOGIN_PAGE_URL);
            await driver.wait(until.elementLocated(By.id('email')), 1000);
            await driver.findElement(By.id('email')).sendKeys(email);
            await driver.findElement(By.id('password')).sendKeys(password, Key.RETURN);
            await driver.wait(until.elementLocated(By.xpath('//span[text()="Adicionar transação"]')), 5000);
            await driver.findElement(By.xpath('//span[text()="Adicionar transação"]')).click();
            //await driver.quit();
        } finally {
        }
    })();
}

module.exports = addTransactions;