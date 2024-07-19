const express = require('express')
const router = express.Router()
const multer = require("multer");
const path = require("path");
const fs = require('fs');
const {createSettings, getSettings} = require('../controllers/settings')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const dir = "uploads/settings";
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      cb(null, dir);
    },
    filename: (req, file, cb) => {
      cb(
        null,
        file.fieldname + "-" + Date.now() + path.extname(file.originalname)
      );
    },
  });

const checkFileType = (file, cb) => {
  const filetypes = /jpg|jpeg|png|webp|svg/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
});


router.post('/settings',upload.single('storeLogo'), createSettings)
router.get('/settings', getSettings)

module.exports = router;