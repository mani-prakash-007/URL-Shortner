import { nanoid } from "nanoid";
import {
  generateShortUrlService,
  getAnalyticsService,
} from "../services/urlService.js";

//generate short ID
export const generateShortUrlController = async (req, res) => {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "url is required" });
  const shortId = nanoid(8);
  const shortURLresponse = await generateShortUrlService(shortId, body.url);
  return res.status(shortURLresponse.statusCode).json({
    status: shortURLresponse.status,
    details: shortURLresponse.details,
  });
};

//Analytics for the shortID

export const getAnalyticsController = async (req, res) => {
  const shortId = req.params.shortId;
  const analyticsResponse = await getAnalyticsService(shortId);
  res.status(analyticsResponse.statusCode).json({
    status: analyticsResponse.status,
    details: analyticsResponse.details,
  });
};
