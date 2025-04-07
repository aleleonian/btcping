import * as puppeteer from 'puppeteer';
import { PRICE_SELECTOR } from './config.js';

export async function fetchBTCPrice() {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto('https://coinmarketcap.com/currencies/bitcoin/');
    await page.waitForSelector(PRICE_SELECTOR); // Change if needed

    const price = await page.evaluate((selector) => {
        const el = document.querySelector(selector);
        return el ? el.textContent.trim() : null;
    }, PRICE_SELECTOR); // 👈 Pass it here

    await browser.close();
    return price;
}
