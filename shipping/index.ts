import {
    BrowserWindow,
    app,
    systemPreferences,
    ipcMain,
    globalShortcut,
    shell,
    Tray,
} from 'electron'
import { autoUpdater } from "electron-updater";
import {
    ALLOWED_HOSTS,
    isLinux,
    isMac,
    isWin,
} from "./constants";
import { bWindowsType } from "./types";
import electronLogger from "electron-log";
import path from 'path'


let mainWindow: BrowserWindow;
let tray: Tray;
let splash: BrowserWindow;

export let bWindows: bWindowsType;
export const __prod__ = app.isPackaged;

const instanceLock = app.requestSingleInstanceLock();

electronLogger.transports.file.level = "debug";

autoUpdater.logger = electronLogger;
// just in case we have to revert to a build
autoUpdater.allowDowngrade = true;

let shouldShowWindow = false;


if (isWin) app.setAppUserModelId("Hangle");


let skipUpdateTimeout: NodeJS.Timeout;
let windowShowInterval: NodeJS.Timeout;


function createMainWindow() {
    console.log(systemPreferences.getColor("desktop"), systemPreferences.getMediaAccessStatus("microphone"))
    mainWindow = new BrowserWindow({
        width: 1500,
        height: 800,
        minWidth: 400,
        minHeight: 600,
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
        frame: isLinux,
        show: false,
    });

    if (!__prod__) {
        mainWindow.webContents.openDevTools();
    }
    mainWindow.loadURL(
        __prod__ ? `https://hangle.me/` : "http://localhost:3001/"
    );

    bWindows = {
        main: mainWindow,
        overlay: undefined,
    };

    mainWindow.once("ready-to-show", () => {
        shouldShowWindow = true;
    });

    // graceful exiting
    mainWindow.on("closed", () => {
        globalShortcut.unregisterAll();
        if (bWindows.overlay) {
            bWindows.overlay.destroy();
        }
        mainWindow.destroy();
    });

    // handling external links
    const handleLinks = (event: any, url: string) => {
        let urlObj = new URL(url);
        let urlHost = urlObj.hostname;
        if (!ALLOWED_HOSTS.includes(urlHost)) {
            event.preventDefault();
            shell.openExternal(url);
        } else {
            if (
                (urlHost == ALLOWED_HOSTS[3] &&
                    urlObj.pathname !== "/login" &&
                    urlObj.pathname !== "/session" &&
                    urlObj.pathname !== "/sessions/two-factor" &&
                    urlObj.pathname !== "/sessions/two-factor/webauthn") ||
                (
                    urlHost == ALLOWED_HOSTS[8] &&
                    urlObj.pathname !== "/account/login_verification"
                )
            ) {
                event.preventDefault();
                shell.openExternal(url);
            }
        }
    };
    mainWindow.webContents.on("new-window", handleLinks);
    mainWindow.webContents.on("will-navigate", handleLinks);
}



function createSplashWindow() {
    splash = new BrowserWindow({
        width: 300,
        height: 410,
        transparent: true,
        frame: false,
        resizable: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    });
    splash.loadFile(
        path.join(__dirname, "./gui/resources/splash/splash-screen.html")
    );
}



if (!instanceLock) {
    if (process.env.hotReload) {
        app.relaunch();
    }
    app.quit()
} else {
    app.on("ready", async () => {
        createSplashWindow();
        if (!__prod__) skipUpdateCheck(splash);
        if (__prod__ && !isLinux) await autoUpdater.checkForUpdates();
        if (isLinux && __prod__) {
            skipUpdateCheck(splash);
        }
    });
    app.on("second-instance", () => {
        if (mainWindow) {
            if (process.env.hotReload) return mainWindow.close();
            if (mainWindow.isMinimized()) mainWindow.restore();
            mainWindow.focus();
        }
    });
}


autoUpdater.on("update-available", (info) => {
    splash.webContents.send("download", info);
    // skip the update if it takes more than 1 minute
    skipUpdateTimeout = setTimeout(() => {
        skipUpdateCheck(splash);
    }, 60000);
});
autoUpdater.on("download-progress", (progress) => {
    let prog = Math.floor(progress.percent);
    splash.webContents.send("percentage", prog);
    splash.setProgressBar(prog / 100);
    // stop timeout that skips the update
    if (skipUpdateTimeout) {
        clearTimeout(skipUpdateTimeout);
    }
});
autoUpdater.on("update-downloaded", () => {
    splash.webContents.send("relaunch");
    // stop timeout that skips the update
    if (skipUpdateTimeout) {
        clearTimeout(skipUpdateTimeout);
    }
    setTimeout(() => {
        autoUpdater.quitAndInstall();
    }, 1000);
});
autoUpdater.on("update-not-available", () => {
    skipUpdateCheck(splash);
});
app.on("window-all-closed", async () => {
    app.quit()
});
app.on("activate", () => {
    if (mainWindow === null) {
            createMainWindow();
    }
});

function skipUpdateCheck(splash: BrowserWindow) {
    createMainWindow();
    splash.webContents.send("notfound");
    if (isLinux || !__prod__) {
        splash.webContents.send("skipCheck");
    }
    // stop timeout that skips the update
    if (skipUpdateTimeout) {
        clearTimeout(skipUpdateTimeout);
    }
    windowShowInterval = setInterval(() => {
        if (shouldShowWindow) {
            splash.webContents.send("launch");
            clearInterval(windowShowInterval);
            setTimeout(() => {
                splash.destroy();
                mainWindow.show();
            }, 800);
        }
    }, 1000);
}