

const cloudinary = require('cloudinary').v2;
const { Readable } = require('stream');

cloudinary.config({
  cloud_name: 'dsxnkdv2k',
  api_key: '833735884435541',
  api_secret: 'SYL5gS5ZicLKRlVohLxLD-ZPyjU'
});

const fileUpload = (folder) => {
  return async (req, res, next) => {
    try {
      if (!req.files || !req.files.files) {
        req.files = []
        next();
      }

      else {
        let files = req.files.files;
        if (!Array.isArray(files)) {
          files = [files];
        }

        const uploadPromises = files.map(file => {
          return new Promise((resolve, reject) => {
            // Create a transform stream for uploading to Cloudinary
            const theTransformStream = cloudinary.uploader.upload_stream({ folder: `Ecommerce/${folder}` }, (error, result) => {
              if (error) {
                reject(error);
              } else {
                resolve(result);
              }
            });

            // Create a Readable stream from the file data
            const readableStream = Readable.from(file.data);

            // Pipe the Readable stream to the Cloudinary upload stream
            readableStream.pipe(theTransformStream);
          });
        });

        // Wait for all uploads to finish
        const uploadResults = await Promise.all(uploadPromises);
        console.log(uploadResults);

        // Pass the upload results to the request object
        req.files = uploadResults.map(result => `${result.public_id}.${result.format}`);
        console.log(req.files);

        next();
      }
    } catch (error) {
      console.error('File upload error:', error);
      return res.status(500).send('File upload failed.');
    }
  };
};

module.exports = fileUpload;

