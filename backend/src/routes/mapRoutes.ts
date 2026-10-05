import express from "express";
import { getParentCompaniesWithLocations } from "../controllers/mapController.ts";

const mapRouter = express.Router();

mapRouter.route("/")
    .get(getParentCompaniesWithLocations);

export default mapRouter;