import fs from "fs";
import httpProxy from "http-proxy";
import { WebServer } from "skyserver";
import Config from "./Config";

export default async function boot() {

    const wssProxy = httpProxy.createServer({
        target: "ws://localhost:9090",
        ws: true,
        ssl: {
            key: fs.readFileSync(Config.key, "utf8"),
            cert: fs.readFileSync(Config.cert, "utf8")
        }
    });
    wssProxy.listen(9091);
    wssProxy.on("error", function (err, req, res) {
        console.log(err);
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Something went wrong. And we are reporting a custom error message.");
    });

    const httpsProxy = httpProxy.createServer({
        target: "http://localhost:9092",
        ssl: {
            key: fs.readFileSync(Config.key, "utf8"),
            cert: fs.readFileSync(Config.cert, "utf8")
        }
    });
    httpsProxy.listen(9093);
    httpsProxy.on("error", function (err, req, res) {
        console.log(err);
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Something went wrong. And we are reporting a custom error message.");
    });

    new WebServer(Config, async () => {
        // ignore.
    }, (req, res) => res.response({
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
        statusCode: 404,
    }));
}