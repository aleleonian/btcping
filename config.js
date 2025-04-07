import * as dotenv from 'dotenv'

dotenv.config();

//TODO make sure the env vars exist

export const X_USERNAME = process.env.X_USERNAME
export const X_PASSWORD = process.env.X_PASSWORD
export const X_EMAIL = process.env.X_EMAIL
export const SCRAPE_INTERVAL_MS = 10 * 1000 // 1 minute
export const PRICE_SELECTOR = process.env.PRICE_SELECTOR

