const multer = require("multer");
const path = require("path")

// memory storage (since you're sending buffer to S3)
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
 const allowedMime = ["image/png", "image/jpeg"];
  const ext = path.extname(file.originalname).toLowerCase();

  const allowedExt = [".png", ".jpg", ".jpeg"];

  if (allowedMime.includes(file.mimetype) && allowedExt.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error("Only .png, .jpg, .jpeg allowed"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 2 * 1024 * 1024, // optional: 2MB limit
  },
});

module.exports = upload;