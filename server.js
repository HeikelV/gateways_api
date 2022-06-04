const express = require("express");
const router = require('./router');
var cors = require('cors');

function createServer() {
	const app = express();
    app.use(cors());
	app.use(express.json());
	app.use('/', router);
	return app
}

module.exports = createServer