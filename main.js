const { app, BrowserWindow ,remote,BrowserView} = require('electron')
const electron=require('electron')
function createWindow () {
    // 创建浏览器窗口
    let win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            webviewTag:true
        }
    })

    let devView= new BrowserView({
        webPreferences: {
            nodeIntegration: true,
            webviewTag:true
        }
    })

    win.setBrowserView(devView)
    devView.setBounds({ x: 0, y: 0, width: 300, height: 300 })


    // 加载index.html文件
    win.loadFile('index.html')

    setTimeout(()=>{
        console.log('electron:',electron)
        const browserContents=electron.webContents.fromId(3)
        const devContents=electron.webContents.fromId(4)

        win.webContents.setDevToolsWebContents(devContents)
        win.openDevTools({mode:"detach"})

        browserContents.openDevTools({mode:'detach'})

    },5000)
}

app.whenReady().then(createWindow)