import { XBot, XBOTConstants } from "xBot-js";
import { X_USERNAME, X_PASSWORD, X_EMAIL } from './config.js';
import path from "path";
import readline from "readline";
import { exitApp } from "./util.js";

// Create an interface for reading user input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let browser, page;
let xBot;

export async function initX() {
    xBot = new XBot();

    xBot.on(XBOTConstants.XBotEvents.NOTIFICATION, (data) => {
        console.log(`✅ XBOTConstants.XBotEvents.NOTIFICATION: ${data}`);
    });

    xBot.on(XBOTConstants.XBotEvents.LOG, (level, ...messages) => {
        const logMessage = `[${level.toUpperCase()}] ${messages.join(" ")}`;

        if (level === XBOTConstants.LOG_LEVELS.ERROR) {
            console.error(logMessage);
        } else if (level === XBOTConstants.LOG_LEVELS.DEBUG) {
            console.debug(logMessage);
        } else if (level === XBOTConstants.LOG_LEVELS.WARN) {
            console.warn(logMessage);
        } else {
            console.log(logMessage);
        }
    });

    xBot.on(XBOTConstants.XBotEvents.WAIT_FOR_USER_ACTION, (message) => {
        console.log("\n🛑 X requires user intervention: " + message);
        console.log("Please solve the captcha, then press Enter to continue...");

        rl.once("line", () => {
            console.log("✅ Continuing execution...");
            xBot.emit(XBOTConstants.XBotEvents.CONTINUE);
        });
    });

    const APP_FOLDER = path.resolve("./");

    let result = await xBot.init(APP_FOLDER, true, false);

    if (!result.success) {
        exitApp("Could xBot.init(): " + result.errorMessage);
    }

    result = await xBot.loginToX(
        X_USERNAME,
        X_PASSWORD,
        X_EMAIL,
    );
    if (!result.success) {
        exitApp("Could xBot.loginToX(): " + result.errorMessage);
    }
    return { browser, page };
}

export async function postTweet(text) {
    const tweetResult = await xBot.tweet(text);
}


