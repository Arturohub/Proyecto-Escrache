const express = require("express");
const cors = require("cors");
require("dotenv/config");
const postRoutes = require("./routes/posts");
const authRoutes = require("./routes/auth");
const cookieParser = require("cookie-parser");
const contactRoutes = require("./routes/contact");
const liveRoutes = require("./routes/live");
const fileUpload = require("express-fileupload")



const app = express();

app.use(cors({
  origin: "https://proyectoescrache.onrender.com",
  credentials: true,
  exposedHeaders: ["Access-Control-Allow-Origin"]
}));
app.use(cookieParser());
app.use(express.json());
app.use(fileUpload())

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/live", liveRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
