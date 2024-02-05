const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid'); // Import UUID v4 generator
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
          
          cb(null, file.fieldname + '-' + uuidv4() + path.extname(file.originalname));
        }
      })
    }).array('files', 5);
  };
module.exports=fileUpload