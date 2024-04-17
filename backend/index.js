const express = require("express");
const cors = require("cors");
const multer = require("multer");
require("dotenv/config");
const postRoutes = require("./routes/posts");
const authRoutes = require("./routes/auth");
const cookieParser = require("cookie-parser");
const contactRoutes = require("./routes/contact");
const liveRoutes = require("./routes/live");
const path = require("path"); 

const app = express();

app.use(cors({
  origin: ["https://proyectoescrache.onrender.com", "https://proyectoescrache.onrender.com/", "https://proyecto-escrache.onrender.com" ],
  credentials: true,
  exposedHeaders: ["Access-Control-Allow-Origin"]
}));
app.use(cookieParser());
app.use(express.json());

app.use('/api/public/upload', express.static(path.join(__dirname, 'public/upload'))); 

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/upload'); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ 
  storage,
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
  }
});

app.post("/upload", upload.single("file"), function (req, res) {
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
