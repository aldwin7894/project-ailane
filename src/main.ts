import { join } from "path";

import { electronApp, optimizer, is } from "@electron-toolkit/utils";
import { app, shell, BrowserWindow, ipcMain } from "electron";

import DB, { migrationRollback } from "./database";
import icon from "../resources/icon.png";

// eslint-disable-next-line @typescript-eslint/no-require-imports
if (require("electron-squirrel-startup")) app.quit();

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === "linux" ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, "preload.js"),
      sandbox: false,
    },
  });

  mainWindow.on("ready-to-show", () => {
    mainWindow.maximize();
  });

  mainWindow.webContents.setWindowOpenHandler(details => {
    shell.openExternal(details.url);
    return { action: "deny" };
  });

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(
      join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`),
    );
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId("com.electron");

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on("browser-window-created", (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });

  // IPC test
  ipcMain.on("ping", () => {
    console.log("pong");
  });
  ipcMain.on("rollbackDb", () => {
    console.log("rollback-db");
    migrationRollback(DB);
  });

  ipcMain.handle("get-sales", () => {
    const query = DB.prepare("SELECT * FROM sales");
    const result = query.all();
    console.log("get-sales", result);
    return result;
  });
  ipcMain.handle("create-sale", (_, data: Sales) => {
    const {
      invoice_number,
      customer_name,
      customer_contact,
      invoice_date,
      cogs_amount,
      total_amount,
      discount_amount,
      tax_amount,
    } = data;
    const query = DB.prepare(`
      INSERT INTO sales (
        invoice_number,
        customer_name,
        customer_contact,
        invoice_date,
        cogs_amount,
        total_amount,
        discount_amount,
        tax_amount
      )
      VALUES(?, ?, ?, ?, ?, ?, ?, ?)
      RETURNING *
    `);
    const result = query.get(
      invoice_number,
      customer_name,
      customer_contact,
      invoice_date,
      cogs_amount,
      total_amount,
      discount_amount,
      tax_amount,
    );
    console.log("create-sale", result);
    return result;
  });

  createWindow();

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    DB.close();
    app.quit();
  }
});

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
