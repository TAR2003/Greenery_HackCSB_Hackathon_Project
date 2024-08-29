import fs from 'fs';
import path from 'path';
import { GoogleAIFileManager } from '@google/generative-ai/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const fileManager = new GoogleAIFileManager(API_KEY);
const genAI = new GoogleGenerativeAI(API_KEY);

// Define the path to the temp directory
const TEMP_DIR = path.join(process.cwd(), 'temp');

// Ensure temp directory exists
if (!fs.existsSync(TEMP_DIR)) {
  fs.mkdirSync(TEMP_DIR, { recursive: true });
}

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');
    const text = formData.get('text') || 'Describe this image.';

    if (!file || !file.name) {
      return new Response('No file uploaded', { status: 400 });
    }

    // Save the file to the temp directory
    const tempFilePath = path.join(TEMP_DIR, file.name);
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    fs.writeFileSync(tempFilePath, buffer);

    // Read the file and upload it using File API
    const base64Image = buffer.toString('base64');
    const mimeType = file.type;

    console.log('File saved and uploaded:', tempFilePath, mimeType);

    // Upload the file using File API
    const uploadResponse = await fileManager.uploadFile(tempFilePath, {
      mimeType,
      inlineData: base64Image,
    });

    // Generate content using the uploaded file
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-pro",
    });

    const result = await model.generateContent([
      {
        fileData: {
          mimeType: uploadResponse.file.mimeType,
          fileUri: uploadResponse.file.uri,
        },
      },
      { text: text },
    ]);

    const generatedText = result.response.text();

    console.log('Generated text:', generatedText);

    // Clean up: delete the temp file
    fs.unlinkSync(tempFilePath);

    return new Response(
      JSON.stringify({ message: generatedText }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error processing request:', error);
    return new Response('Server error', { status: 500 });
  }
}

export const config = {
  api: {
    bodyParser: false, // Disable body parsing to handle file streams
  },
};
