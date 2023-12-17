const { app, BrowserWindow } = require('electron');
const path = require('path');

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 500,
    height: 500,
    x: 1600,
    y: 800,
    frame: false,
    transparent: true,
    resizable: false,
    alwaysOnTop: true,
    skipTaskbar: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  win.loadFile('index.html');

  win.on('close', (event) => {
    event.preventDefault();
    win.minimize();
  });

  win.on('closed', () => {
    win = null;
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('browser-window-blur', () => {
  win.minimize();
});

app.on('browser-window-focus', () => {
  win.restore();
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  } else {
    win.restore();
  }
});

app.on('before-quit', () => (app.quitting = true));
