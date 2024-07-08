const { Builder, By, until, Browser, Key, chromium } = require('selenium-webdriver');

(async function example() {
    let driver = await new Builder().forBrowser(Browser.CHROME).build();
    try {
        await driver.get('https://x.com/i/flow/login');
        await driver.wait(until.elementLocated(By.name('text')), 10000);
        await driver.findElement(By.name("text")).sendKeys("asifyan01@gmail.com")
        await driver.findElement(By.className("css-175oi2r r-sdzlij r-1phboty r-rs99b7 r-lrvibr r-ywje51 r-184id4b r-13qz1uu r-2yi16 r-1qi8awa r-3pj75a r-1loqt21 r-o7ynqc r-6416eg r-1ny4l3l")).click()
    } finally {
        await console.log("berhasil di cari")
    }
})();
