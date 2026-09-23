import express, { Application, Request, Response } from "express";
import cors from "cors";
import corsOptions from "./config/corsOptions.ts";
import errorHandler from "./middleware/errorHandler.ts";

const app: Application = express();

app.use(cors(corsOptions));

app.use(express.json());

app.all("{*path}", (_req: Request, res: Response) => {
    res.status(404).json({ message: "Not found." })
});

app.use(errorHandler);


export default app;