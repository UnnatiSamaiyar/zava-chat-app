const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    title: "Zava.chat Hello",
    webPreferences: {
      nodeIntegration: true
    }
  });

  win.loadFile('index.html');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  // On macOS, apps stay open until Cmd+Q
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  // Reopen window on macOS
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
