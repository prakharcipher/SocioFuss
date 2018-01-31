const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

AWS.config.update({
  accessKeyId: 'AKIAIAUOSR76MWLBKUXQ',
  secretAccessKey: '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',
  region: 'ap-south-1'
});

const s0 = new AWS.S3({});
const upload = multer({
  storage: multerS3({
    s3: s0,
    bucket: 'sociofuss',
    acl: 'public-read',
    metadata: function(req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function(req, file, cb) {
      cb(null, file.originalname);
    }
  }),

  rename: function(fieldname, filename) {
    return filename.replace(/\W+/g, '-').toLowerCase();
  }
});

exports.Upload = upload;
