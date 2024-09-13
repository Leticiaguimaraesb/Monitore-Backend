import express, { Express, Request, Response } from "express";
import { router } from "./api/routes";
import * as dotenv from "dotenv";
import cors from "cors";
import { errorHandler } from "./api/middlewares/errorHandler";

const port = 3000;

dotenv.config();
const app: Express = express();
app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Bem vindo ao Dashboard da Rebel Alliance");
});
app.use("/", router);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

export default {
  app,
};
