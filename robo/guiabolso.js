const {Builder, By, Key, until} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const chromedriver = require('chromedriver');

const LOGIN_PAGE_URL = "https://www.guiabolso.com.br/web/#/login";

let options = new chrome.Options();
//Below arguments are critical for Heroku deployment
options.addArguments("--headless");
//options.addArguments("--disable-gpu");
//options.addArguments("--no-sandbox");

function addTransactions(email, password, transactions, callback) {

    console.log("Starting Chrome", options);
    
    (async function example() {
        let driver = await new Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
            .build();
        try {
            await driver.get(LOGIN_PAGE_URL);
            await driver.wait(until.elementLocated(By.id('email')), 1000);
            await driver.findElement(By.id('email')).sendKeys(email);
            await driver.findElement(By.id('password')).sendKeys(password, Key.RETURN);
            await driver.wait(until.elementLocated(By.xpath('//span[text()="Adicionar transação"]')), 5000);
            await driver.findElement(By.xpath('//span[text()="Adicionar transação"]')).click();
        } finally {
            await driver.quit();
        }
    })();
}

module.exports = guiabolso = {
    addTransactions
};