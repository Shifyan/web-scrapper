const { Builder, By, until, Browser, Key } = require('selenium-webdriver');

(async function example() {
    let driver = await new Builder().forBrowser(Browser.CHROME).build();
    try {
        await driver.get('https://www.youtube.com/');
        await driver.findElement(By.name("search_query")).sendKeys("Sandika Galih")
        await driver.findElement(By.id("search-icon-legacy")).click()
    } finally {
        await console.log("berhasil di cari")
    }
})();
