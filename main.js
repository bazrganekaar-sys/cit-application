const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    title: "MANAGER SECURITY | MOVEMENT SYSTEM",
    icon: path.join(__dirname, 'icon.ico'),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false,                   // ڕێگەدان بە لۆدکردنی بەستەرەکانی دەرەوە و وێنەکان
      allowRunningInsecureContent: true,    // ڕێگەدان بە پرینتکردنی وێنە و سەرچاوە دەرەکییەکان
      experimentalFeatures: true,
      nativeWindowOpen: true                // ڕێگەدان بە بازدانی پەنجەرەی پرینت (window.open)
    }
  });

  // ڕێگەدان بە بەکارهێنانی window.open (بۆ کاتی پرینتکردن یان ڕاپۆرتەکان)
  win.webContents.setWindowOpenHandler(({ url }) => {
    return {
      action: 'allow',
      overrideBrowserWindowOptions: {
        autoHideMenuBar: true,
        webPreferences: {
          nodeIntegration: true,
          contextIsolation: false,
          webSecurity: false
        }
      }
    };
  });

  // لۆدکردنی فایلی index.html
  win.loadFile(path.join(__dirname, 'index.html'));

  // شاردنەوەی مێنیوی سەرەوە
  win.setMenu(null);
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});