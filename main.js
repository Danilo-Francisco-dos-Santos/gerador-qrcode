const { app, BrowserWindow, Menu } = require('electron')

/*Configuração da opção sobre*/
const { dialog } = require('electron');
const { version } = require('node:os');
const { versions } = require('node:process');
const path = require('node:path');

/*Verifica se tem atualização e notifica o usuário*/
const { autoUpdater } = require("electron-updater");
autoUpdater.checkForUpdatesAndNotify();

const createWindow = () => {
    const win = new BrowserWindow({
        width: 600,
        height: 630,
        /***Adicionando o logo***/
        icon: __dirname + "/image/icone.png",
        resizable: false,
    })

    win.loadFile('index.html')
}

/***Template de Menu***/
const templateMenu = [
    {
        label: 'Menu',
        submenu: [
            {
                label: 'Fechar',
                role: process.platform === 'darwin' ? 'close' : 'quit'
            },

            {
                label: 'Atualizar',
                role: 'reload'
            },

            {
                label: 'Sobre',
                click: () => {
                    dialog.showMessageBox({
                        type: 'info',
                        title: 'Sobre',
                        message: 'Versão: ' + '1.0.0' + '\n'
                            + 'Electron: ' + versions.electron + '\n'
                            + 'Node.js: ' + versions.node + '\n'
                            + 'Chromium: ' + versions.chrome + '\n'
                            + 'SO: ' + version()
                    })
                }
            }
        ]
    }
];

/***Menu***/
const menu = Menu.buildFromTemplate(templateMenu);
Menu.setApplicationMenu(menu);

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

