import { admin } from "../../Admin/admin-authorizer";

export async function uploadBase64Image(base64String, filename) {
  try {
    const bucket = admin.storage().bucket();
    const file = bucket.file(`image/profile/${filename}`);

    // Convert base64 to buffer
    const buffer = Buffer.from(base64String, "base64");

    // Upload the file to Firebase Storage
    await file.save(buffer, {
      metadata: {
        contentType: "image/png", // Adjust the content type as needed
      },
    });

    // Get the public URL of the uploaded file
    const url = await file.getSignedUrl({
      action: "read",
      expires: "01-01-2100", // Adjust the expiration date as needed
    });

    return url[0];
  } catch (error) {
    console.error("Error uploading image:", error);
    return null;
  }
}
