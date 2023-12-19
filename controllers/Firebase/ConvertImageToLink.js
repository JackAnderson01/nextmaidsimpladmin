import moment from "moment/moment";
import { admin } from "../Admin/admin-authorizer";

export default async function ConvertImageToLink(base64ImageData, uid) {
  // Convert base64 to Buffer
  const bufferData = Buffer.from(base64ImageData, "base64");

  // Generate a unique filename (e.g., using a timestamp)
  const filename = `image/profile/${uid}.png`;

  // Save the image to Firebase Storage
  const bucket = admin.storage().bucket();
  const file = bucket.file(filename);
  await file.save(bufferData, {
    metadata: {
      contentType: "image/png", // Adjust the content type based on your image type
    },
  });

  // Get the download URL of the saved image
  const formattedDate = moment().add(5, "years").format("MM-DD-YYYY");
  const downloadURL = await file.getSignedUrl({
    action: "read",
    expires: formattedDate,
  });
  return downloadURL;
}
