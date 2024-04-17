const express = require("express");
const cors = require("cors");
require("dotenv/config");
const axios = require("axios");

const app = express();

app.use(cors({
  origin: ["https://proyectoescrache.onrender.com", "https://proyectoescrache.onrender.com/", "https://proyecto-escrache.onrender.com" ],
  credentials: true,
  exposedHeaders: ["Access-Control-Allow-Origin"]
}));

app.use(express.json());

app.post("/upload", async function (req, res) {
  try {
    if (!req.body.imageData) {
      return res.status(400).json({ message: "No image data provided" });
    }

    const imgurRes = await axios.post("https://api.imgur.com/3/image", {
      image: req.body.imageData,
    }, {
      headers: {
        Authorization: `Client-ID ${process.env.IMGUR_CLIENT_ID}`,
      },
    });

    if (imgurRes.data.success) {
      return res.status(200).json({ imgurUrl: imgurRes.data.data.link });
    } else {
      throw new Error("Failed to upload image to Imgur");
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
