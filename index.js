const { on } = require("events");
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const port = 3000;

app.use(express.static("public"));

io.on("connection", (socket) => {
	
	socket.on("messageFromClient", (message) => {
		io.emit("messageFromServer", message);
	});

});

server.listen(port, () => {
	console.log(`Hello World at port ${port}!`);
})