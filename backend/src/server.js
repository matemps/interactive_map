import express from "express";
import cors from "cors";
import corsOptions from "./config/corsOptions.js";
import errorHandler from "./middleware/errorHandler.js";

const PORT = 3000;

const app = express();

app.use(cors(corsOptions));

app.use(express.json());

app.all("{*path}", (_req, res) => {
    res.status(404).json({ message: "Not found." })
});

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});