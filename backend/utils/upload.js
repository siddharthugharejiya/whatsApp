const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const storage = new GridFsStorage({
  url: "mongodb+srv://multiera95:95@cluster0.8i0uu.mongodb.net/?retryWrites=true&w=majority",
  file: (req, file) => {
    log(req)
    const match = ["image/jpeg", "image/png"];
    if (match.indexOf(file.mimetype) === -1) {
 
      return Promise.reject(new Error("Invalid file type"));
    }
    return {
      bucketName: "photos",
      filename: `${Date.now()}-file-${file.originalname}`,
    };
  },
});



  module.exports = multer({ storage });



