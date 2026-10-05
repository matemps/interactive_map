import express from "express";
import { foo } from "../controllers/mapController.ts";

const mapRouter = express.Router();

mapRouter.route("/")
    .get(foo);

export default mapRouter;