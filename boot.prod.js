const Config = require("./dist/Config.js").default;
const Boot = require("./dist/Boot.js").default;

Config.httpPort = 80;
Config.port = 443;
Config.key = "/etc/letsencrypt/live/klaytn-node.klu.bs/privkey.pem";
Config.cert = "/etc/letsencrypt/live/klaytn-node.klu.bs/fullchain.pem";

Boot();