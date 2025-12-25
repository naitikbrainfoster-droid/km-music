const multer = require("multer");
const multerS3 = require("multer-s3");
const s3 = require("./s3");

const uploadTrailer = multer({
  storage: multerS3({
    s3,
    bucket: process.env.AWS_S3_BUCKET_NAME,
    acl: "public-read",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: (req, file, cb) => {
      const ext = file.originalname.split(".").pop();
      cb(
        null,
        `Upcoming/${Date.now()}-${file.fieldname}.${ext}`
      );
    },
  }),

  // ✅ IMPORTANT: allow empty file for UPDATE
  fileFilter: (req, file, cb) => {
    if (!file) {
      return cb(null, false);
    }
    cb(null, true);
  },
});

module.exports = uploadTrailer;
