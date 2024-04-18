const express = require("express");
const cors = require("cors");
require("dotenv/config");
const fileUpload = require('express-fileupload');
const fs = require('fs');
const imgur = require('imgur');

const app = express();
app.use(fileUpload());

app.use(cors({
  origin: ["https://proyectoescrache.onrender.com", "https://proyectoescrache.onrender.com/", "https://proyecto-escrache.onrender.com" ],
  credentials: true,
  exposedHeaders: ["Access-Control-Allow-Origin"]
}));

app.use(express.json());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
