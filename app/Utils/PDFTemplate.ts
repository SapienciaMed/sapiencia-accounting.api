import Application from "@ioc:Adonis/Core/Application";
import puppeteer, { PaperFormat } from "puppeteer";

type Dimension = {
  top: string;
  right: string;
  bottom: string;
  left: string;
};

export const PDF_PATH = Application.tmpPath("result.pdf");

export const createPDFTemplate = async (
  template: string,
  dimension: Dimension,
  format: PaperFormat
) => {
  // CREATE A BROWSER INSTANCE
  const browser = await puppeteer.launch({ headless: "new" });
  // CREATE A NEW PAGE
  const page = await browser.newPage();
  // GET HTML CONTENT FORM HTML FILE
  // const html = fs.readFileSync(
  //   "./storage/templates/referralDocument.html",
  //   "utf-8"
  // );
  await page.setContent(template, {
    waitUntil: "domcontentloaded",
  });
  // TO REFLECT CSS USED FOR SCREENS INSTEAD OF PRINT
  await page.emulateMediaType("screen");
  // DOWNLOAD PDF
  await page.pdf({
    path: PDF_PATH,
    margin: dimension,
    printBackground: true,
    format,
  });
  // Close the browser instance
  await browser.close();
  return PDF_PATH;
};
