const express = require("express");
const cors = require("cors");
const multer = require("multer");
require("dotenv/config");
const postRoutes = require("./routes/posts");
const authRoutes = require("./routes/auth");
const cookieParser = require("cookie-parser");
const contactRoutes = require("./routes/contact");
const liveRoutes = require("./routes/live");
const path = require("path"); // Import path module

const app = express();


app.use(cors({
  origin: ["http://localhost:3000", "https://proyectoescrache.onrender.com"],
  credentials: true
}));
app.use(cookieParser());
app.use(express.json());

app.use('/upload', express.static(path.join(__dirname, 'public/upload'))); // Use path.join to construct the path

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'public/upload')); // Use path.join to construct the path
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

app.post("/api/upload", upload.single("file"), function (req, res) {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const file = req.file;
  return res.status(200).json(file.filename);
});

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/live", liveRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
