"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const http_proxy_1 = __importDefault(require("http-proxy"));
const skyserver_1 = require("skyserver");
const Config_1 = __importDefault(require("./Config"));
async function boot() {
    const wssProxy = http_proxy_1.default.createServer({
        target: "ws://localhost:9090",
        ws: true,
        ssl: {
            key: fs_1.default.readFileSync(Config_1.default.key, "utf8"),
            cert: fs_1.default.readFileSync(Config_1.default.cert, "utf8")
        }
    });
    wssProxy.listen(9091);
    wssProxy.on("error", function (err, req, res) {
        console.log(err);
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Something went wrong. And we are reporting a custom error message.");
    });
    const httpsProxy = http_proxy_1.default.createServer({
        target: "http://localhost:9092",
        ssl: {
            key: fs_1.default.readFileSync(Config_1.default.key, "utf8"),
            cert: fs_1.default.readFileSync(Config_1.default.cert, "utf8")
        }
    });
    httpsProxy.listen(9093);
    httpsProxy.on("error", function (err, req, res) {
        console.log(err);
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Something went wrong. And we are reporting a custom error message.");
    });
    new skyserver_1.WebServer(Config_1.default, async () => {
    }, (req, res) => res.response({
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
        statusCode: 404,
    }));
}
exports.default = boot;
//# sourceMappingURL=Boot.js.map