// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
const window = require("electron").BrowserWindow;
require('@electron/remote/main').initialize()
const path = require('path');
let mainWindow;
function createWindow () {
// Create the browser window.
  mainWindow = new BrowserWindow({
    autoHideMenuBar: true,
    frame: false,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
      enableRemoteModule: true,
      preload: path.join(__dirname, 'preload.js'),
      webviewTag: true,
      devTools: false
    },
    icon: path.join(__dirname, 'icon.ico')
  });
  mainWindow.maximize()
  //mainWindow.setContentProtection(true)
  require('@electron/remote/main').enable(mainWindow.webContents)
  // and load the index.html of the app.
  //mainWindow.loadURL('https://rscript.teleweb.repl.co/www/');
  mainWindow.loadFile('index.html')

  //Open the DevTools.
  //mainWindow.webContents.openDevTools();
}
app.whenReady().then(() => {
  createWindow()
  app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
  })

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})