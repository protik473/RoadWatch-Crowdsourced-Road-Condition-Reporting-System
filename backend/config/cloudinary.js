const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: "YOUR_REAL_CLOUD_NAME",
  api_key: "YOUR_REAL_API_KEY",
  api_secret: "YOUR_REAL_API_SECRET",
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "roadwatch",
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});

module.exports = { cloudinary, storage };

