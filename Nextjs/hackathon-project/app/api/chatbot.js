// pages/api/chatbot.js

import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { query } = req.body;

    if (!query) {
      return res.status(400).json({ error: 'No query provided.' });
    }

    try {
      // Send the user query to the Gemini API
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_GEMINI_API_BASE_URL}/chat`,
        {
          prompt: query,
          // additional configuration depending on API requirements
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      // Send back the response from Gemini API
      return res.status(200).json({
        response: response.data,
      });
    } catch (error) {
      console.error('Error communicating with Gemini API:', error);
      return res.status(500).json({ error: 'Failed to process your request' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
