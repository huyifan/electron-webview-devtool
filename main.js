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
        parent:win,
        webPreferences: {
            nodeIntegration: true,
            webviewTag:true
        }
    })

    // win.setBrowserView(devView2)
    // devView2.setBounds({ x: 300, y: 0, width: 300, height: 300 })
    // devView2.webContents.loadURL('null')

    //调用顺序不能变，否则就无法完成
    win.setBrowserView(devView)
    devView.setBounds({ x: 100, y: 0, width: 200, height: 200 })
    //devView.webContents.loadURL('http://www.baicu.com')
    devView.webContents.loadURL('22')


    // 加载index.html文件
    win.loadFile('index.html')
    //devView打开devTools的时候，这里不能打开，否则无法展示devTools
    win.webContents.openDevTools({mode:'detach'})
    setTimeout(()=>{
        console.log('electron:',electron)
        const browserContents=electron.webContents.fromId(3)
        const devContents=electron.webContents.fromId(4)
        devContents.webContents=devView.webContents
        //browserContents.webContents.setDevToolsWebContents(devContents)
        //devView.webContents.loadURL('blank')
        //devView.webContents.reloadIgnoringCache()
        //win.webContents.setDevToolsWebContents(devView.webContents)
        browserContents.setDevToolsWebContents(devContents.webContents)
        //browserContents.setDevToolsWebContents(devView.webContents)
        //devView.webContents.goBack()
        //win.webContents.openDevTools()
        browserContents.openDevTools()
        //devView.webContents.loadURL('null')

        setTimeout(()=>{
            console.log(devView.webContents.getURL())
        },2000)

        //browserContents.openDevTools({mode:'detach'})
    },5000)
}

app.whenReady().then(createWindow)
