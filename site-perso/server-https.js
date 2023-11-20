const https = require('https');
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const vhost = require('vhost');
const path = require('path');
const WebSocketServer = require('ws').Server;

const options = {
	key: fs.readFileSync('/etc/letsencrypt/live/belkhiri.dev/privkey.pem'),
	cert: fs.readFileSync('/etc/letsencrypt/live/belkhiri.dev/fullchain.pem')
//	ca: fs.readFileSync('/etc/letsencrypt/live/belkhiri.dev/chain.pem')
};

let score = 0;

const api = express();

const corsOption = {
	origin: ["http://localhost:5173", "https://belkhiri.dev", "https://www.belkhiri.dev", "https://games.belkhiri.dev", "https://fantasy.belkhiri.dev"],
	optionsSuccessStatus: 200
}
api.use(cors(corsOption));

api.get("/models/:name", (req, res) => {
	const fileName = req.params.name;
	res.download("./models/" + fileName);
});

api.get("/websites/layout.json", (req, res) => {
	res.download("./websites/" + "layout.json");
});

api.get("/gif", (req, res) => {
	res.download("./media/" + "gif.gif");
});

const games = express();

//////////// SHARK ////////////
games.get("/shark", async (req, res) => {
        res.sendFile(path.join(__dirname, "Wireshark", "index.html"));
});
//////////////////////////////

////////////  WAR  ////////////
games.get("/war/static/js/:name", async (req, res) => {
        console.log("js");
	res.sendFile(path.join(__dirname, "War", "build", "static", "js", req.params.name));
});

games.get("/war/static/css/:name", async (req, res) => {
        console.log("css");
	res.sendFile(path.join(__dirname, "War", "build", "static", "css", req.params.name));
});

games.get("/war/static/media/:name", async (req, res) => {
	res.sendFile(path.join(__dirname, "War", "build", "static", "media", req.params.name));
});

games.get("/war/manifest.json", async (req, res) => {
        console.log("manifest");
	res.sendFile(path.join(__dirname, "War", "build", "manifest.json"));
});

games.get("/war", async (req, res) => {
        console.log("index");
	res.sendFile(path.join(__dirname, "War", "build", "index.html"));
});
///////////////////////////////

//////////// CUBE ////////////////
games.get("/cube/static/js/:name", async (req, res) => {
        console.log("js");
        res.sendFile(path.join(__dirname, "Cube", "build", "static", "js", req.params.name));
});

games.get("/cube/static/css/:name", async (req, res) => {
        console.log("css");
        res.sendFile(path.join(__dirname, "Cube", "build", "static", "css", req.params.name));
});

games.get("/cube/static/media/:name", async (req, res) => {
        res.sendFile(path.join(__dirname, "Cube", "build", "static", "media", req.params.name));
});

games.get("/cube/manifest.json", async (req, res) => {
        console.log("manifest");
        res.sendFile(path.join(__dirname, "Cube", "build", "manifest.json"));
});

games.get("/cube", async (req, res) => {
        console.log("index");
        res.sendFile(path.join(__dirname, "Cube", "build", "index.html"));
});
////////////////////////////////////////

//////////// MENU /////////////
games.get("/static/js/:name", async (req, res) => {
	res.sendFile(path.join(__dirname, "games-menu", "build", "static", "js", req.params.name));
});

games.get("/static/css/:name", async (req, res) => {
        res.sendFile(path.join(__dirname, "games-menu", "build", "static", "css", req.params.name));
});

games.get("manifest.json", async (req, res) => {
        res.sendFile(path.join(__dirname, "games-menu", "build", "manifest.json"));
});

games.get("*", async (req, res) => {
	console.log("serving default index.html");
	res.sendFile(path.join(__dirname, "games-menu", "build", "index.html"));
});
////////////////////////////////


const main = express();

main.use(express.static(path.join(__dirname, "build")));

main.get("/plus", (req, res) => {
	score = score + 1;
	res.send(""+score);
});

main.get("/moins", (req, res) => {
        score = score - 1;
        res.send(""+score);
});

main.get("/score", (req, res) => {
        res.send(""+score);
});

main.get("/", async (req, res) => {
        res.sendFile(path.join(__dirname, "build", "index.html"));
});

///////////////////////////////////////////////////////////////////

const fantasy = express();

fantasy.use("/", express.static("fantasyRPG/dist"));

var app = express();

app.use((req, res, next) => {
	if (req.headers.upgrade && req.headers.upgrade.toLowerCase() === "websocket")
        {
		console.log(req);
	}
	next();
});

app.use(vhost('api.belkhiri.dev', api));
app.use(vhost('games.belkhiri.dev', games));
app.use(vhost('fantasy.belkhiri.dev', fantasy));
app.use(vhost('belkhiri.dev', main));
app.use(vhost('*.belkhiri.dev', main));
app.use(vhost('*.*', main));
app.use(vhost('*.*.*', main));


const server = https.createServer(options, app);
server.listen(443, () => {
	console.log("server is running at port 8080");
})


const socketServer = new WebSocketServer({ server })
console.log(socketServer)
socketServer.on('connection', ws => {
        console.log("Client connected");
        ws.send("Hi there!");
})
