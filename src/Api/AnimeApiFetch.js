export const API_URLS = [
    'https://api.jikan.moe/v4/anime?&status=airing&min_score=8&type=tv&limit=4',
    'https://api.jikan.moe/v4/top/anime?limit=4',
    'https://api.jikan.moe/v4/seasons/now?limit=4',
    'https://api.jikan.moe/v4/genres/anime?limit=4'
  ];
  
  export const AnimeApiFetch = async (url) => {
    let cacheKey = url;
    let cachedData = localStorage.getItem(cacheKey);
    if (cachedData) {
      return JSON.parse(cachedData);
    } else {
      let response = await fetch(url);
      let responseData = await response.json();
      localStorage.setItem(cacheKey, JSON.stringify(responseData));
      return responseData;
    }
  };