const multer = require('multer'); // multer for uploading image to memory
const jimp = require('jimp'); // jimp for resizing file
const uuid = require('uuid');
var upload = multer({ dest: 'public/uploads/' });

const multerOptions = {
  storage: multer.memoryStorage(),
  fileFilter: (req, image, next) => {
    //const isPhoto = file.mimetype.startsWith('images/');
    // if (isPhoto) {
    //   console.log("IS A PHOTO");
    //   next(null, true);
    // } else {
    //   console.log("IS NOT A PHOTO");
    //   next({ message: "That filetype isn't allowed!" }, false);
    // }
    next(null, true);

  }
}

exports.upload = multer(multerOptions).single('image');

exports.resize = async (req, res, next) => {
  console.log('resizing');
  console.log("resize REQ", req.body);
  console.log("resize file to resize is", req.file);
  if (req.file === '') {
    console.log("no image file passed");
    next();
    return;
  }

  try {
    const originalName = req.file.originalname;
    req.body.image = new Date().toISOString() + originalName;

    const photo = await jimp.read(req.file.buffer);
    await photo.resize(800, jimp.AUTO);
    await photo.write(`./public/uploads/${req.body.image}`);

    //const extension = req.image.mimetype.split('/')[1];
    // written the photo to our filesystem
  } catch (ex) {
    console.log("unable to resize file", ex);
  }
  next();
}
