const { S3Client } = require("@aws-sdk/client-s3");
const { getSecret } = require("../services/ec2Services");

let s3 = null;

const connectS3 = async () => {
  if (s3) return s3; // reuse existing instance

  try {
    const ACCESS_KEY = await getSecret("/event-api/AWS_S3_ACCESS_KEY");
    const SECRET_KEY = await getSecret("/event-api/AWS_S3_ACCESS_SECRET_KEY");

    s3 = new S3Client({
      region: process.env.AWS_REGION || "ap-south-1",
      credentials: {
        accessKeyId: ACCESS_KEY,
        secretAccessKey: SECRET_KEY,
      },
    });

    return s3;
  } catch (err) {
    console.error("S3 connection error:", err.message);
    process.exit(1);
  }
};

module.exports = connectS3;