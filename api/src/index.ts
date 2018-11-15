import * as dotenv from "dotenv";
import {Application} from "express";
import * as http from "http";
import {App} from "./App";

dotenv.config();

const app: Application = App();

// Server
const port = process.env.SERVER_PORT;
const server = http.createServer(app);
server.listen(port, () => {
    console.log("Server listening on port: ", port);
});
