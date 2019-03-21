require('chromedriver');
const assert = require('assert');
const {Builder, Key, By, until, Alert} = require('selenium-webdriver');
describe('Checkout http://localhost:3000/home', function () {
    let driver;
    before(async function() {
        driver = await new Builder().forBrowser('chrome').build();
    });
    it('Login for phuketlist', async function() {
        // Load the page
        await driver.get('http://localhost:3000/home');
        // Find the search box by id
        await driver.findElement(By.linkText("Login")).click();
        //search for text fields
        await driver.findElement(By.id("email")).sendKeys("testUser@gmail.com");
        await driver.findElement(By.id("password")).sendKeys("testUser");
        await driver.findElement(By.className("btn btn-primary btn-block ")).click();
        await driver.wait(until.elementLocated(By.id('new_task')), 10000).sendKeys("chips");
        await driver.findElement(By.className("btn btn-outline-success")).click();
        await driver.wait(until.elementLocated(By.id("chips")));
        await driver.findElement(By.className("fa fa-trash fa-2x")).click();
        driver.sleep(1000);
            driver.switchTo().alert().accept();
    });
    // close the browser after running tests
    after(() => driver && driver.quit());
})
