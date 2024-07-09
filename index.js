const password= "penasehatkamar01"
const email = "asifyan01@gmail.com"
const number = "082142527899"

const { Builder, By, until, Browser, Key, chromium } = require('selenium-webdriver');

(async function example() {
    let driver = await new Builder().forBrowser(Browser.CHROME).build();
    try {
        await driver.get('https://x.com/i/flow/login');
        await driver.wait(until.elementLocated(By.name('text')), 10000);
        await driver.findElement(By.name("text")).sendKeys(email)
        await driver.findElement(By.className("css-175oi2r r-sdzlij r-1phboty r-rs99b7 r-lrvibr r-ywje51 r-184id4b r-13qz1uu r-2yi16 r-1qi8awa r-3pj75a r-1loqt21 r-o7ynqc r-6416eg r-1ny4l3l")).click()
        const checkPhone = async ()=>{
        await driver.wait(until.elementLocated(By.name('text')), 10000);
        const check = await driver.findElement(By.name("text"))
        if (check){
            return true
        }else{
            return false
        }
       }
       const checked = checkPhone()
       if (checked === true){
        await driver.findElement(By.name("text")).sendKeys(number)
        await driver.findElement(
          By.className(
            "css-175oi2r r-sdzlij r-1phboty r-rs99b7 r-lrvibr r-19yznuf r-64el8z r-1fkl15p r-1loqt21 r-o7ynqc r-6416eg r-1ny4l3l"
          )
        ).click();
       }
        await driver.wait(until.elementLocated(By.name('password')), 10000);
        await driver.findElement(By.name("password")).sendKeys(password)
        await driver.findElement(By.className("css-175oi2r r-sdzlij r-1phboty r-rs99b7 r-lrvibr r-19yznuf r-64el8z r-1fkl15p r-1loqt21 r-o7ynqc r-6416eg r-1ny4l3l")).click();
        await driver.wait(until.elementLocated(By.className("r-30o5oe r-1dz5y72 r-1niwhzg r-17gur6a r-1yadl64 r-deolkf r-homxoj r-poiln3 r-7cikom r-1ny4l3l r-xyw6el r-13qz1uu r-fdjqy7")), 10000)
        await driver.findElement(By.className("r-30o5oe r-1dz5y72 r-1niwhzg r-17gur6a r-1yadl64 r-deolkf r-homxoj r-poiln3 r-7cikom r-1ny4l3l r-xyw6el r-13qz1uu r-fdjqy7")).sendKeys("Hallo", Key.ENTER())
        await driver.findElement(By.className("r-30o5oe r-1dz5y72 r-1niwhzg r-17gur6a r-1yadl64 r-deolkf r-homxoj r-poiln3 r-7cikom r-1ny4l3l r-xyw6el r-13qz1uu r-fdjqy7"))
    } finally {
        await console.log("berhasil di cari")
    }
})();
