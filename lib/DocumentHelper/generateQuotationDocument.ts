import puppeteer from 'puppeteer';
import { join, resolve } from 'path';
import fs from 'node:fs';
import Handlebars from 'handlebars';
import { Quotation } from '../../prisma/generated/client';
import { DocumentContextBuilder } from './DocumentContextBuilder';

export const generateQuotationDocument = async ({
  quotation,
}: {
  quotation: Quotation;
}) => {
  const name = 'quotation-temp.pdf';

  let configLaunch = {
    headless: true,
    ignoreDefaultArgs: ['--disable-extensions'],
  };

  const browser = await puppeteer.launch(configLaunch);

  const page = await browser.newPage();
  const waitUntil = 'networkidle2';

  const templatePath = join(process.cwd(), './templates/quotation.hbs');
  const templateFile = fs.readFileSync(templatePath, 'utf-8');
  const quotationTemplateCompiled = Handlebars.compile(templateFile);

  const context = new DocumentContextBuilder()
    .addCustomField('quotation', quotation)
    .buildCommonContext();

  const fileHTML = quotationTemplateCompiled(context);

  await page.setContent(fileHTML, {
    waitUntil,
  });

  await page.setDefaultNavigationTimeout(0);

  await page.pdf({
    format: 'A4',
    path: `tmp/${name}`,
    displayHeaderFooter: false,
    preferCSSPageSize: false,
    printBackground: true,
  });

  await browser.close();
  const pdfFile = fs.readFileSync(`tmp/${name}`);

  fs.unlinkSync(`tmp/${name}`);

  return pdfFile;
};
