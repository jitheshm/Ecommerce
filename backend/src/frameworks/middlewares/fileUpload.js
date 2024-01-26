const multer = require('multer');
const path = require('path');
const fs = require('fs');
const fileUpload = (folder) => {
    const uploadDirectory=`public/uploads/${folder}`
    if (!fs.existsSync(uploadDirectory)) {
        fs.mkdirSync(uploadDirectory,{recursive:true});
      } 
    return multer({
      storage: multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null,uploadDirectory );
        },
        filename: function (req, file, cb) {
          cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
        }
      })
    }).array('files', 5);
  };
module.exports=fileUpload