require('chromedriver');
const assert = require('assert');
const {Builder, Key, By, until} = require('selenium-webdriver');
describe('Checkout http://localhost:3000/home', function () {
    let driver;
    before(async function() {
        driver = await new Builder().forBrowser('chrome').build();
    });
    it('Register for phuketlist', async function() {
        // Load the page
        await driver.get('http://localhost:3000/home');
        // Find the search box by id
        await driver.findElement(By.linkText("Register")).click();
        //search for text fields
        await driver.findElement(By.id("name")).sendKeys("testUser");
        await driver.findElement(By.id("email")).sendKeys("testUser@gmail.com");
        await driver.findElement(By.id("password")).sendKeys("testUser");
        await driver.findElement(By.className("btn btn-primary btn-block ")).click();
        await driver.wait(until.elementLocated(By.className('sub-header')), 10000);
        // Enter keywords and click enter
       // await driver.findElement(By.className("gLFyf gsfi")).sendKeys('dalenguyen', Key.RETURN);
        // Wait for the results box by id
       // await driver.wait(until.elementLocated(By.id('rcnt')), 10000);
        // We will get the title value and test it
        //let title = await driver.getTitle();
      //  assert.equal(title, 'dalenguyen - Google Search');
    });
    // close the browser after running tests
    after(() => driver && driver.quit());
})