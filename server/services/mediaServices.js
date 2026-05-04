const connectS3 = require("../config/s3");
const { PutObjectCommand } = require("@aws-sdk/client-s3");

const uploadToS3 = async (file) => {
  try {
    const s3 = await connectS3();
    const key = `profile/${Date.now()}-${file.originalname}`;

    const params = {
      Bucket: process.env.AWS_BUCKET_KEY,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    await s3.send(new PutObjectCommand(params));

    // 🔥 IMPORTANT: manually construct CDN URL
    const url = `https://assets.vamsimarripudi.tech/${key}`;

    return url;

  } catch (err) {
    console.error("S3 upload error:", err.message);
    throw err;
  }
};

module.exports = { uploadToS3 };