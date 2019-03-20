const multer = require('multer');
const jimp = require('jimp');
const uuid = require('uuid');

const multerOptions = {
  storage: multer.memoryStorage(),
  fileFilter: (req, res, next) => {
    const isPhoto = file.mimeType.startsWith('images/');
    if (isPhoto) {
      next(null, true);
    } else {
      next({ message: "That filetype isn't allowed!" }, false);
    }
  }
}

exports.upload = multer(multerOptions).single('image');

exports.resize = async (req, res, next) => {
  console.log('resizing');
  if (!req.file) {
    next();
    return;
  }
  const extension = req.file.mimeType.split('/')[1];
  // then setup so that createStore has info to store
  // need a unique string
  req.body.image = `${uuid.v4()}.${extension}`;
  // now resize
  const photo = await jimp.read(req.file.buffer);
  await photo.resize(800, jimp.AUTO);
  await photo.write(`./public/uploads/${req.body.image}`);
  // written the photo to our filesystem
  next();
}
