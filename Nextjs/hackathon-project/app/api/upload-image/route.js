import { NextResponse } from "next/server";
import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  try {
    const { image } = await req.json(); // Parse the JSON request body
    if (!image) {
      return NextResponse.json(
        { error: "No image data provided" },
        { status: 400 }
      );
    }

    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.v2.uploader.upload_stream(
        { folder: "default" }, // Specify the folder or use 'default'
        (error, result) => {
          if (error) {
            console.error("Error uploading to Cloudinary:", error);
            return resolve(
              NextResponse.json(
                { error: "Error uploading to Cloudinary" },
                { status: 500 }
              )
            );
          }

          console.log("Image URL:", result.secure_url);
          return resolve(
            NextResponse.json({ url: result.secure_url }, { status: 200 })
          );
        }
      );

      // Convert base64 to buffer and upload
      const buffer = Buffer.from(image, "base64");
      uploadStream.end(buffer);
    });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Error processing request" },
      { status: 500 }
    );
  }
}
