import { nanoid } from "nanoid";
import URL from "../models/urlSchema.js";
export const generateShortUrlService = async (shortId, originalUrl) => {
  console.log(shortId, originalUrl);
  try {
    const urlExist = await URL.findOne({ originalURL: originalUrl });
    if (urlExist) {
      return {
        statusCode: 409,
        status: "Short URL exist for the Provided URL",
        details: urlExist,
      };
    } else {
      const shortURl = await URL.create({
        shortURL: shortId,
        originalURL: originalUrl,
        visitHistory: [],
      });
      return {
        statusCode: 200,
        status: "short url generated..",
        details: shortURl,
      };
    }
  } catch (error) {
    return {
      statusCode: 400,
      status: "short url generation failed.Please Retry ",
      details: error,
    };
  }
};

export const getAnalyticsService = async (shortId) => {
  try {
    const analyticsData = await URL.findOne({ shortURL: shortId });

    return {
      statusCode: 200,
      status: "Analytics data fetch success",
      details: analyticsData.visitHistory,
    };
  } catch (error) {
    return {
      statusCode: 400,
      status: "Analytics data fetch Failed",
      details: error,
    };
  }
};
