import axios from 'axios';

export const fetchFromAPI = async (url: string, params?: string) => {
    const options = {
        method: 'GET',
        url: `https://yt-api.p.rapidapi.com/${url}`,
        headers: {
          'x-rapidapi-key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
          'x-rapidapi-host': 'yt-api.p.rapidapi.com'
        },
        params: { id: params }
      };

    try {
        const { data } = await axios.request(options);
        return data;
    } catch (error) {
        console.error(error);
    }
};