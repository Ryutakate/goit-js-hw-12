import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com';

export async function fetchImages(searchTerm, page = 1, perPage = 40) {
    const API_URL = 'https://pixabay.com/api/';
    const API_KEY = '49114756-3e4a97c2ae725133efe287d92';

    try {
        const response = await axios.get(API_URL, {
            params: {
                key: API_KEY,
                q: searchTerm,
                image_type: 'photo',
                orientation: 'horizontal',
                safesearch: true,
                page,
                per_page: perPage
            }
        });
        return response;
    } catch (error) {
        console.error('Error fetching images:', error);
        throw error;
    }
}
