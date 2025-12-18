const multer = require("multer");
const multerS3 = require("multer-s3");
const s3 = require("./s3");

const uploadArtistImage = multer({
  storage: multerS3({
    s3,
    bucket: process.env.AWS_BUCKET_NAME,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: (req, file, cb) => {
      const fileName = `artists/${Date.now()}-${file.originalname}`;
      cb(null, fileName);
    },
  }),
});

module.exports = uploadArtistImage;
