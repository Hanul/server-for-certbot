import fs from "fs";
import httpProxy from "http-proxy";
import { WebServer } from "skyserver";
import Config from "./Config";

export default async function boot() {

    httpProxy.createServer({
        target: "ws://localhost:9090",
        ws: true,
        ssl: {
            key: fs.readFileSync(Config.key, "utf8"),
            cert: fs.readFileSync(Config.cert, "utf8")
        }
    }).listen(9091);

    new WebServer(Config, async () => {
        // ignore.
    }, (req, res) => res.response({
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
        statusCode: 404,
    }));
}