import {
  S3Client,
  ListObjectsV2Command,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const region = process.env.AWS_REGION;

if (!accessKeyId || !secretAccessKey || !region) {
  throw new Error("Missing AWS credentials or region.");
}

const s3 = new S3Client({
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
  region,
});

const getSignedUrlForImage = async (key: string | undefined) => {
  const command = new GetObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
  });
  return getSignedUrl(s3, command, { expiresIn: 3600 });
};

export const getAllCollectionImages = async () => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Prefix: process.env.AWS_BUCKET_PREFIX,
  };

  const command = new ListObjectsV2Command(params);
  const data = await s3.send(command);

  const imageUrlsPromises = data?.Contents?.map(async (item) => {
    try {
      const signedUrl = await getSignedUrlForImage(item.Key);
      return signedUrl;
    } catch (e) {
      console.log("error", e);
    }
  });
};
