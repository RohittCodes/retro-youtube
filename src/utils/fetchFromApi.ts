import axios from 'axios';

export const fetchFromAPI = async (url: string, params?: string) => {
    const options = {
        method: 'GET',
        url: `https://yt-api.p.rapidapi.com/${url}`,
        headers: {
          'x-rapidapi-key': '28d0a14844mshc0200a68982ea43p1ce9a8jsnbf2505ec0926',
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