import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import { urlRoutes } from "./routes/urlRoutes.js";
import URL from "./models/urlSchema.js";
import axios from "axios";
const app = express();
const PORT = 3000;
dotenv.config();

// Allow requests from all
app.use(
  cors({
    origin: "*",
  })
);

//Parsing Req.Body as Json and url enocded form
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Database Connection
const URI = process.env.MONGODB_CONN_URI;
mongoose.connect(URI);
const conn = mongoose.connection;
conn.once("open", () => {
  console.log("DB Connected");
});

//Routes

app.use("/url", urlRoutes);
app.get("/proxy", async (req, res) => {
  const url = req.query.url;
  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Error accessing URL" });
  }
});
app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortURL: shortId,
    },
    {
      $push: {
        visitHistory: {
          timeStamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.originalURL);
});

app.listen(PORT, () => console.log(`Server Started on Port : ${PORT}`));
