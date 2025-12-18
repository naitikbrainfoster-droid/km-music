const multer = require("multer");
const multerS3 = require("multer-s3");
const s3 = require("./s3");

const uploadTrailer = multer({
  storage: multerS3({
    s3,
    bucket: process.env.AWS_S3_BUCKET_NAME,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: (req, file, cb) => {
      cb(null, `Upcoming/Trailer Video/${Date.now()}-${file.originalname}`);
    },
  }),
});

module.exports = uploadTrailer;
