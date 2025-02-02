const { Builder, By, until, Browser } = require("selenium-webdriver");
const prompt = require("prompt-sync")();
const ExcelJS = require("exceljs");

// Inisiasi ExcelJS
const workbook = new ExcelJS.Workbook();
const sheet = workbook.addWorksheet("MySheet");
sheet.columns = [
  { header: "Judul", key: "judul", width: "100" },
  { header: "Penulis", key: "penulis", width: "50" },
];

// Fungsi Cek Apakah string Kosong
const isEmpty = (keyword) => {
  const keywordTrim = keyword.trim();
  return keywordTrim.length === 0;
};

// Melakukan Input Search Keyword beserta Validasi Input
let keyword;

do {
  keyword = prompt("Masukkan Pencarian: ");
  if (isEmpty(keyword)) {
    console.warn("Pencarian Tidak Boleh Kosong");
  }
} while (isEmpty(keyword));

// Melakukan Input Max Result beserta Validasi Input
let maxResult;

do {
  const input = prompt("Berapa Maksimal Hasil Pencarian: ");
  maxResult = parseInt(input);
  if (isNaN(maxResult)) {
    console.warn("Anda Memasukkan Bukan Angka!!");
  }
} while (isNaN(maxResult));

// Memulai Crawler
(async function crawler() {
  let driver = await new Builder().forBrowser(Browser.CHROME).build();
  try {
    await driver.get("https://opac.iainponorogo.ac.id/index.php");
    await driver.findElement(By.id("keyword")).sendKeys(keyword);
    await driver.findElement(By.name("search")).click();
    // Melakukan Try Pencarian
    try {
      // Tunggu hingga elemen dengan className "titleField" ditemukan
      await driver.wait(
        until.elementLocated(By.className("titleField")),
        10000
      );
      const data = [];

      // Logika untuk mengklik "Berikutnya" sampai habis
      let hasNextPage = true;
      let nextPage = 2;
      let isNextLinkFound;
      let isMaxResult = false;
      try {
        isNextLinkFound = await driver.findElement(By.className(`next_link`));
      } catch (error) {
        isNextLinkFound = false;
      }

      while (hasNextPage) {
        // Tunggu hingga elemen "titleField" muncul di halaman
        await driver.wait(
          until.elementLocated(By.className("titleField")),
          10000
        );

        // Proses elemen "titleField" dan "Author" di halaman saat ini
        const titleElements = await driver.findElements(
          By.className("titleField")
        );
        const authorElements = await driver.findElements(
          By.className("author")
        );

        for (let i = 0; i < titleElements.length; i++) {
          const titleText = await titleElements[i].getText();
          const authorText = await authorElements[i].getText();
          let dataBuku;

          // Cek Kesalahan Crawling
          if (titleText == "" && authorText == "") {
            dataBuku = {
              judul: "Judul Tidak Termuat",
              penulis: "Penulis Tidak Termuat",
            };
          } else {
            dataBuku = {
              judul: titleText,
              penulis: authorText,
            };
          }
          // Push data buku ke Array
          data.push(dataBuku);
          if (data.length === maxResult) {
            isMaxResult = true;
            i = titleElements.length;
          }
        }

        // Periksa apakah tautan "Berikutnya" ada
        let nextLink;
        try {
          if (isNextLinkFound) {
            nextLink = await driver.findElement(By.className(`next_link`));
          } else {
            nextLink = await driver.findElement(By.linkText(`${nextPage}`));
          }
          // Periksa apakah sudah memenuhi maksimal result
          if (isMaxResult) {
            hasNextPage = false;
          }
        } catch (error) {
          // Jika "next_link" tidak ditemukan, berhenti
          hasNextPage = false;
        }

        if (hasNextPage && nextLink) {
          // Klik tautan "Berikutnya"
          await nextLink.click();
          // Tunggu sebentar untuk memastikan halaman dimuat
          await driver.sleep(2000);
        }
        nextPage++;
      }
      data.forEach((item) => {
        sheet.addRow(item);
      });

      await workbook.xlsx.writeFile(`./hasil/${keyword}.xlsx`);
      await console.log("Selesai Mencari");
    } catch (err) {
      console.warn("Data Tidak Ditemukan");
    }
  } finally {
    await driver.close();
  }
})();
