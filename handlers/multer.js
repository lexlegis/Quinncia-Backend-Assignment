const multer = require('multer')

module.exports = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    if(!file.mimetype.match(/(jpg|jpeg|png)$/i)) {
      cb(new Error('File type is not supported.', false));
      return;
    }
    cb(null, true);
  }
})