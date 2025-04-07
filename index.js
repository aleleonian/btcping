
import { initX, postTweet } from './x.js';
import { fetchBTCPrice } from './price.js';
import { SCRAPE_INTERVAL_MS } from './config.js';

(async () => {
    try {
        console.log('🔐 Logging into X...');
        await initX();

        setInterval(async () => {
        // setTimeout(async () => {
            try {
                const price = await fetchBTCPrice();
                if (!price) throw new Error('BTC price not found');

                const text = `BTC/USD: ${price}\n#Bitcoin #BTC`;
                console.log(`📤 Posting: ${text}`);
                await postTweet(text);
            } catch (err) {
                console.error('⛔ Error during tick:', err.message);
            }
        }, SCRAPE_INTERVAL_MS);

    } catch (err) {
        console.error('❌ Initialization failed:', err.message);
        process.exit(1);
    }
})();
