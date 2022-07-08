const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const dayjs = require("dayjs");

const port = 5000;

app.use(express.static("public"));

io.on("connection", (socket) => {
	
	socket.on("messageFromClient", (message) => {
		const sendContent = {
			"message": message,
			"timestamp": dayjs().format("YYYY-MM-DD HH:mm:ss")
		};
		io.emit("messageFromServer", sendContent);
	});

});

server.listen(process.env.PORT || port, () => {
	console.log(`Hello World at port ${port}!`);
});