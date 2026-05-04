// services/mediaService.js
const { PutObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const connectS3 = require("../config/s3");

const BUCKET = process.env.AWS_BUCKET_NAME;
const CDN = process.env.AWS_CDN_URL;

const ALLOWED = ["image/jpeg", "image/png", "image/webp"];

const buildKey = (userId, scope, fileName) => {
  if (scope === "avatar") {
    return `avatars/${userId}/profile.jpg`; // overwrite
  }
  if (scope === "event") {
    return `events/${userId}/${Date.now()}-${fileName}`;
  }
  return `misc/${userId}/${Date.now()}-${fileName}`;
};

exports.getUploadUrl = async ({ userId, fileName, fileType, scope }) => {
  if (!ALLOWED.includes(fileType)) {
    throw new Error("Invalid file type");
  }

  const s3 = await connectS3();
  const key = buildKey(userId, scope, fileName);

  const command = new PutObjectCommand({
    Bucket: BUCKET,
    Key: key,
    ContentType: fileType,
    CacheControl:
      scope === "avatar"
        ? "public, max-age=3600"
        : "public, max-age=31536000, immutable",
  });

  const uploadUrl = await getSignedUrl(s3, command, { expiresIn: 60 });

  return {
    uploadUrl,
    key,
    fileUrl: `${CDN}/${key}`, // always CDN
  };
};

exports.deleteFile = async (key) => {
  if (!key) throw new Error("Key required");

  const s3 = await connectS3();

  await s3.send(
    new DeleteObjectCommand({
      Bucket: BUCKET,
      Key: key,
    })
  );
};