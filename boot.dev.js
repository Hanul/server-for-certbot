const Config = require("./dist/Config.js").default;
const Boot = require("./dist/Boot.js").default;

Config.httpPort = 1109;
Config.port = 1110;
Config.key = "test-ssl/key.pem";
Config.cert = "test-ssl/cert.pem";

Boot();