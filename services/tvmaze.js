import axios from 'axios';

const API_URL = 'https://api.tvmaze.com';

export const getLatestSeries = async () => {
  try {
    const response = await axios.get(`${API_URL}/shows`);
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getLatestSeriesAndCategories = async () => {
    try {
      const response = await axios.get(`${API_URL}/shows`);
      const shows = response.data;
      const showPromises = shows.map((show) => axios.get(`${API_URL}/shows/${show.id}/genres`));
      const genres = await Promise.all(showPromises);
      console.log(shows.map((show, index) => ({ ...show, genres: genres[index].data })))
      return shows.map((show, index) => ({ ...show, genres: genres[index].data }));
    } catch (error) {
      console.error(error);
      return [];
    }
  };