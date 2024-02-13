const WebSocket = require('ws');
const express = require('express');
const http = require('http');

/**
 * WebSocket server for Express
 * @param {Object} server - HTTP server instance
 */
function setupWebSocket(server) {
  const app = express();
  const wsServer = new WebSocket.Server({ server });

  // Serve HTML page with JavaScript to establish WebSocket connection
  app.get('/websocket', (req, res) => {
    res.sendFile(__dirname + '/websocket.html');
  });

  // WebSocket server logic
  wsServer.on('connection', (ws) => {
    console.log('WebSocket client connected');

    // Echo back any message received from client
    ws.on('message', (message) => {
      console.log('Received message from client:', message);
      ws.send(message); // Echo back the message
    });

    // Handle client disconnection
    ws.on('close', () => {
      console.log('WebSocket client disconnected');
    });
  });
}

// Create an HTTP server instance
const server = http.createServer();

// Setup WebSocket on the server
setupWebSocket(server);

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
