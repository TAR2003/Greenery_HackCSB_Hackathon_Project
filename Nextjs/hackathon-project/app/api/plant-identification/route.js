import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';
import path from 'path';

const PLANTNET_API_URL = 'https://my-api.plantnet.org/v2/identify/all';
const API_KEY = process.env.PLANTNET_API_KEY;

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');
    const organType = formData.get('organ'); // Get organ type from the form data

    if (!file || !file.name || !organType) {
      return new Response('File or organ type not provided', { status: 400 });
    }

    // Save the uploaded file to a temporary location
    const tempFilePath = path.join(process.cwd(), 'temp', file.name);
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    fs.writeFileSync(tempFilePath, buffer);

    // Prepare the form data for the API request
    const form = new FormData();
    form.append('organs', organType); // Use the provided organ type
    form.append('images', fs.createReadStream(tempFilePath));
   // form.append('include-related-images', 'true');

    // Send the request to Pl@ntNet API
    const response = await axios.post(`${PLANTNET_API_URL}?api-key=${API_KEY}&include-related-images=true`, form, {
      headers: form.getHeaders(),
    });

    const plantData = response.data;


    // Clean up: remove the temp file
    fs.unlinkSync(tempFilePath);

    return new Response(JSON.stringify(plantData), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error processing request:', error);
    return new Response('Server error', { status: 500 });
  }
}

export const config = {
  api: {
    bodyParser: false, // Disable body parsing to handle file uploads
  },
};
