const {app, BrowserWindow, ipcMain} = require('electron');

// Keep a global reference of the window object, 
// if you don't, the window will be closed automatically 
// since the JavaScript object is garbage collected.
let mainWindow;

/**
 * Creates the main window of the application.
 * 
 * @returns {void}
 */
function createWindow() {
    mainWindow = new BrowserWindow({
      width: 1120,
      height: 780,
      minWidth: 1120,
      minHeight: 780,
      frame: false,
      transparent: true,
      backgroundColor: '#00FFFFFF',
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
    }
  });

  mainWindow.loadFile('public/index.html');

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

/**
 * Handle the close and minimize 
 * events from the renderer process.
 */
ipcMain.on('close', () => {
  app.quit()
})

ipcMain.on('minimize', () => {
  mainWindow.minimize();
});

// Create the main window when the app is ready
app.on('ready', createWindow);

/**
 * Handle the window-all-closed and activate
 */
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});