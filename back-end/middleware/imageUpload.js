const multer = require('multer'); // multer for uploading image to memory
const jimp = require('jimp'); // jimp for resizing file
const uuid = require('uuid');

const multerOptions = {
  storage: multer.memoryStorage(),
  fileFilter: (req, file, next) => {
    console.log("THE MIMETYPE IS", file.mimeType);
    const isPhoto = file.mimeType.startsWith('images/');
    if (isPhoto) {
      console.log("IS A PHOTO");
      next(null, true);
    } else {
      console.log("IS NOT A PHOTO");
      next({ message: "That filetype isn't allowed!" }, false);
    }
  }
}

exports.upload = multer(multerOptions).single('image');

exports.resize = async (req, res, next) => {
  console.log('resizing');
  if (!req.file) {
    console.log("no image file passed");
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
