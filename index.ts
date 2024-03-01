import WebSocket from 'ws'

const wss = new WebSocket.Server({port: 5000}, () => console.log('escuchando')) 

wss.on("connection", ws => {
    console.log('cliente conectado')

    ws.on("message", (data) => {
        console.log(data.toString())

        wss.clients.forEach(client => {
            if(client !== ws && client.readyState == WebSocket.OPEN){
                client.send(data.toString())
            }
        })
    })

    ws.on('close', () => {
        console.log('cliente desconectado')
    })
})

