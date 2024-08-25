import axios from 'axios';

// Define the Trefle API key and endpoint
const TREFLE_API_KEY = process.env.TREFLE_API_KEY; // Store your API key in an environment variable
const TREFLE_API_URL = 'https://trefle.io/api/v1/plants';

// Function to fetch plant recommendations based on location
export async function recommendPlants(location) {
  try {
    // Define your query parameters based on the location
    const query = {
      // Customize the query based on your location format and Trefle API's requirements
      location: location, 
      fields: 'common_name,scientific_name,image_url' // Adjust the fields as needed
    };

    // Make a request to the Trefle API
    const response = await axios.get(TREFLE_API_URL, {
      params: query,
      headers: {
        'Authorization': `Bearer ${TREFLE_API_KEY}`
      }
    });

    // Return the plant recommendations
    return response.data;
  } catch (error) {
    console.error('Error fetching plant recommendations:', error);
    throw new Error('Unable to fetch plant recommendations');
  }
}
