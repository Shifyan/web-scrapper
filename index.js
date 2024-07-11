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
let nextPage = 2;

const keyword = prompt(`Masukkan Pencarian: `);
(async function crawler() {
  let driver = await new Builder().forBrowser(Browser.CHROME).build();
  try {
    await driver.get("https://opac.iainponorogo.ac.id/index.php");
    await driver.findElement(By.id("keyword")).sendKeys(keyword);
    await driver.findElement(By.name("search")).click();

    // Tunggu hingga elemen dengan className "titleField" ditemukan
    await driver.wait(until.elementLocated(By.className("titleField")), 10000);
    const data = [];
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
      const authorElements = await driver.findElements(By.className("author"));

      for (let i = 0; i < titleElements.length; i++) {
        const titleText = await titleElements[i].getText();
        const authorText = await authorElements[i].getText();

        let dataBuku = {
          judul: titleText,
          penulis: authorText,
        };
        data.push(dataBuku);
      }
      // Periksa apakah tautan "Berikutnya" ada
      let nextLink;
      try {
        nextLink = await driver.findElement(By.linkText(`${nextPage}`));
      } catch (error) {
        hasNextPage = false; // Jika "next_link" tidak ditemukan, berhenti
      }

      if (hasNextPage && nextLink) {
        // Klik tautan "Berikutnya"
        await nextLink.click();
        // Tunggu sebentar untuk memastikan halaman dimuat
        await driver.sleep(2000);
      }
      nextPage++;
    }
    await console.log("Selesai Mencari");
    await console.log(data);
  } finally {
    await driver.close();
  }
})();
