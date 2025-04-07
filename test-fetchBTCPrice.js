import * as dotenv from 'dotenv'
dotenv.config();

import { fetchBTCPrice } from './price.js';

const price = await fetchBTCPrice();
if (!price) throw new Error('BTC price not found');
console.log("price->" + price);