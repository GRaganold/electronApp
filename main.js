const { app, BrowserWindow } = require("electron");
const path = require("path");
const url = require("url");

function createMainWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    transparent: false,
    frame: true,
    webPreferences: {
      nodeIntegration: true,
    },
  });

mainWindow.webContents.openDevTools();
  const startURL = url.format({
    pathname: path.join(__dirname, "./app/build/index.html"),
    protocol: "file:",
    slashes: true,
  });

  mainWindow.loadURL(startURL);
}

app.whenReady().then(createMainWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow();
  }
});
