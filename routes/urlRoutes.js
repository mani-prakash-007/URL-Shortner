import express from "express";
import {
  generateShortUrlController,
  getAnalyticsController,
} from "../controllers/urlControllers.js";

export const urlRoutes = express.Router();

//Post url to shortening
urlRoutes.post("/", generateShortUrlController);

//get analytics
urlRoutes.get("/analytics/:shortId", getAnalyticsController);
