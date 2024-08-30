import axios from 'axios';

let totalPages = null; // Track total number of pages

export async function fetchPlantScientificNamesByPage(page = 1) {
  const trefleToken = process.env.TREFLE_API_KEY;
  const zoneCode = 'BAN'; // Zone ID for Bangladesh

  const baseUrl = `https://trefle.io/api/v1/plants?page=${page}&zone_id=${zoneCode}`;

  try {
    const response = await axios.get(baseUrl, {
      headers: {
        Authorization: `Bearer ${trefleToken}`,
      },
    });

    // Extract scientific names and images from Trefle API
    const plants = response.data.data;
    const plantDetailsFromWikipedia = await Promise.all(
      plants.map(async (plant) => {
        const wikipediaDetails = await fetchPlantDetailsFromWikipedia(plant.scientific_name, plant.image_url);
        const scientificName = plant.common_name ? plant.common_name : plant.scientific_name;
        return { scientificName, wikipediaDetails };
      })
    );

   // Extract total number of pages if not already set
    if (!totalPages) {
      const lastPageUrl = response.data.links.last;
      const lastPageMatch = lastPageUrl.match(/page=(\d+)/);
      totalPages = lastPageMatch ? parseInt(lastPageMatch[1], 10) : 1;
    }

    return {
      plants,
      plantDetailsFromWikipedia,
      currentPage: page,
      totalPages: totalPages
    };

  } catch (error) {
    console.error('Error fetching plant data:', error.message);
    throw new Error('Failed to fetch plant data');
  }
}

// Helper function to fetch plant details, images, and page URL from Wikipedia
async function fetchPlantDetailsFromWikipedia(scientificName, trefleImageUrl) {
  const wikipediaApiUrl = `https://en.wikipedia.org/w/api.php`;

  try {
    // Step 1: Try fetching details using scientific name
    let response = await axios.get(wikipediaApiUrl, {
      params: {
        action: 'query',
        format: 'json',
        titles: scientificName,
        prop: 'extracts|pageimages',
        exintro: true,
        explaintext: true,
        pithumbsize: 500,
        origin: '*',
      },
    });

    let pages = response.data.query.pages;
    let page = Object.values(pages)[0]; // Extract the first result

    // If no details are found, try searching for the page using common names
    if (!page || !page.extract) {
      response = await axios.get(wikipediaApiUrl, {
        params: {
          action: 'query',
          format: 'json',
          list: 'search',
          srsearch: scientificName,
          origin: '*',
        },
      });

      const searchResults = response.data.query.search;
      if (searchResults.length > 0) {
        const bestMatchTitle = searchResults[0].title;

        // Fetch details from the best match page
        response = await axios.get(wikipediaApiUrl, {
          params: {
            action: 'query',
            format: 'json',
            titles: bestMatchTitle,
            prop: 'extracts|pageimages',
            exintro: true,
            explaintext: true,
            pithumbsize: 500,
            origin: '*',
          },
        });

        pages = response.data.query.pages;
        page = Object.values(pages)[0];
      } else {
        return { details: 'No information available on Wikipedia', imageUrl: trefleImageUrl, pageUrl: '#' };
      }
    }

    let details = page.extract || 'No information available on Wikipedia';
    let imageUrl = trefleImageUrl || 'No image available';
    const pageUrl = `https://en.wikipedia.org/?curid=${page.pageid}`; // Construct the Wikipedia page URL


    // If image URL is still not available, use wiki image
    if (imageUrl === 'No image available') {
      imageUrl = page.thumbnail?.source;
    }

    //if still image not available then use a demo image
    if(imageUrl === undefined) {
      imageUrl = 'https://thumbs.dreamstime.com/b/seagrass-oceana-serrulata-undersea-red-sea-egypt-sharm-el-sheikh-nabq-bay-seagrass-oceana-serrulata-undersea-red-sea-279820596.jpg'
    }

    return { details, imageUrl, pageUrl };
  } catch (error) {
    console.error(`Error fetching details from Wikipedia for ${scientificName}:`, error.message);
    return { details: 'Failed to fetch details from Wikipedia', imageUrl: trefleImageUrl, pageUrl: '#' };
  }
}
