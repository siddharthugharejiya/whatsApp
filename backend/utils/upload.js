const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');

const storage = new GridFsStorage({
   
    url: "mongodb+srv://multiera95:95@cluster0.8i0uu.mongodb.net/?retryWrites=true&w=majority",
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    file: (req, file) => {
      const match = ["image/jpeg", "image/png"];
      if (match.indexOf(file.mimetype) === -1) {
        return null;
      }
      return {
        bucketName: "photos",
        filename: `${Date.now()}-file-${file.originalname}`,
      };
    },
  });


  module.exports = multer({ storage });



