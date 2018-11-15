import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as dotenv from "dotenv";
import * as express from "express";
import * as morgan from "morgan";
import { censusRouter } from "./router/census";

dotenv.config();

export const App = () => {

  const app = express();

  // app.use(morgan("combined"));
  app.use(bodyParser.json({ type: "*/*" }));
  app.use(cors());

  censusRouter(app);

  return app;

}
