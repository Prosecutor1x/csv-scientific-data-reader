// import  { diskStorage} from 'multer';
// import { extname } from 'path';
const multer = require("multer");
const { diskStorage } = require("multer");
const { extname } = require("path");

const storage = diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const ext = extname(file.originalname);
    if (ext !== ".csv") {
      return cb(new Error("Only CSV files are allowed"));
    }
    cb(null, true);
  },
});

module.exports = upload;
