const {Builder, By, Key, until} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const chromedriver = require('chromedriver');

const LOGIN_PAGE_URL = "https://www.guiabolso.com.br/web/#/login";

let options = new chrome.Options();
//Below arguments are critical for Heroku deployment
//options.addArguments("--headless");
//options.addArguments("--disable-gpu");
//options.addArguments("--no-sandbox");

function addTransactions(email, password, transactions, callback) {

    if (!email || !password) {
        callback("Informe o login e senha do guiabolso");
        return;
    }

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
            
            transactions.forEach(t => fillTransaction(driver, t));
            
            callback(null, []);
        } finally {
            //await driver.quit();
        }
    })();
}

async function fillTransaction(driver, t) {
    console.log('Transaction', t);
    
    await driver.sleep(1000);
    
    await driver.findElement(By.xpath('//span[text()="Adicionar transação"]')).click();
    await driver.wait(until.elementLocated(By.id('add-transaction-name')), 5000);

    if (t.positive) {
        await driver.findElement(By.xpath('//input[name="transactionType" and value="income"]')).click();
    }
    await driver.findElement(By.id('add-transaction-name')).sendKeys(t.text);
    await driver.findElement(By.name('transactionValue')).sendKeys(t.value);

    const date = t.date.split("/");
    await driver.findElement(By.name('day')).sendKeys(date[0]);
    await driver.findElement(By.name('month')).sendKeys(date[1]);
    await driver.findElement(By.name('year')).sendKeys(date[2]);

    await driver.findElement(By.xpath('//div[text()="De qual conta é?"]')).click();
    await driver.findElement(By.xpath('//li[text()="Green Card"]')).click();
}

module.exports = guiabolso = {
    addTransactions
};