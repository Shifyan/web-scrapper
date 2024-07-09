const {
  Builder,
  By,
  until,
  Browser,
  Key,
  chromium,
} = require("selenium-webdriver");

(async function example() {
  let driver = await new Builder().forBrowser(Browser.CHROME).build();
  try {
    await driver.get("https://opac.iainponorogo.ac.id/index.php");
    await driver.findElement(By.id("keyword")).sendKeys("Pendidikan");
    await driver.findElement(By.name("search")).click();

    await driver.wait(until.elementLocated(By.className("titleField")), 10000);
    const titles = await driver.findElements(By.className("titleField"));
    for (let title of titles) {
      const textTitle = await title.getText();
      await console.log(textTitle);
    }
  } finally {
    await console.log("berhasil di cari");
  }
})();
