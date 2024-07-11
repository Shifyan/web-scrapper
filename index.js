const {
  Builder,
  By,
  until,
  Browser,
  Key,
  chromium,
} = require("selenium-webdriver");
const prompt = require("prompt-sync")();
const ExcelJS = require("exceljs");
const workbook = new ExcelJS.Workbook();
const sheet = workbook.addWorksheet("My Sheet");

const keyword = prompt(`Masukkan Pencarian: `);
(async function crawler() {
  let driver = await new Builder().forBrowser(Browser.CHROME).build();
  try {
    await driver.get("https://opac.iainponorogo.ac.id/index.php");
    await driver.findElement(By.id("keyword")).sendKeys(keyword);
    await driver.findElement(By.name("search")).click();

    // Tunggu hingga elemen dengan className "titleField" ditemukan
    await driver.wait(until.elementLocated(By.className("titleField")), 10000);
    let a = 1;

    // Logika untuk mengklik "Berikutnya" sampai habis
    let hasNextPage = true;
    while (hasNextPage) {
      // Tunggu hingga elemen "titleField" muncul di halaman
      await driver.wait(
        until.elementLocated(By.className("titleField")),
        10000
      );

      // Proses elemen "titleField" di halaman saat ini (contoh: mencetak judul)
      const titleElements = await driver.findElements(
        By.className("titleField")
      );
      for (let titleElement of titleElements) {
        const textTitle = await titleElement.getText();
        console.log(a + "-" + textTitle);
        a++;
      }

      // Periksa apakah tautan "Berikutnya" ada
      let nextLink;
      try {
        nextLink = await driver.findElement(By.linkText("2"));
      } catch (error) {
        hasNextPage = false; // Jika "next_link" tidak ditemukan, berhenti
      }

      if (hasNextPage && nextLink) {
        // Klik tautan "Berikutnya"
        await nextLink.click();
        // Tunggu sebentar untuk memastikan halaman dimuat
        await driver.sleep(2000);
      }
    }
  } finally {
    await console.log("berhasil di cari");
  }
})();
