import * as electron from "electron";
import * as path from "path";
import * as url from "url";

class Main {
    private mainWindow: Electron.BrowserWindow;
    private app: Electron.App = electron.app;

    constructor() {
        this.app.on("ready", () => this.createWindow());

        this.app.on("window-all-closed", () => {
            if (process.platform !== "darwin") {
                this.app.quit();
            }
        });

        this.app.on("activate", () => {
            if (this.mainWindow === null) {
                this.createWindow();
            }
        });
    }

    private createWindow() {
        this.mainWindow = new electron.BrowserWindow({ width: 800, height: 600 });
        this.mainWindow.loadURL(url.format({
            pathname: path.join(__dirname, "../html/index.html"),
            protocol: "file:",
            slashes: true,
        }));

        this.mainWindow.on("closed", () => {
            this.mainWindow = null;
        });
    }
}

const main = new Main();
