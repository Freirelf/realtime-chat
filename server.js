const http = require('http');
const  { WebSocket, WebSocketServer } = require('ws') 
const path = require('path');
const fs = require('fs');

// Servidor HTTP para servir a página de chat
const server = http.createServer((req, res) => {
  fs.readFileSync(path.join(__dirname, 'index.html'), (err, data) => {
    if (err) {
      res.writeHead(500)
      return res.end("Error loading index.html")
    }
    res.writeHead(200, {'Content-Type': 'text/html'})
    res.end(data)
  })
})

const wss = new WebSocketServer({ server })

// Gerenciar conexões e mensagens
wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    console.log("Received:", message)
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message)
      }
    })
  })
})

server.listen(3333, () => {
  console.log('Server is listening on http://localhost:3333')
})