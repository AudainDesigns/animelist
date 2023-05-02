import pLimit from 'p-limit';

//let apiCallCount = 0;

const limit = pLimit(1); // set the limit to 1 request at a time

const animeDataCache = new Map();

const animeDataPromiseQueue = [];

const throttleGetAnimeData = async (index, searchQuery) => {
  const apiUrls = [
    'https://api.jikan.moe/v4/anime?&status=airing&min_score=9&type=film&limit=1',
    'https://api.jikan.moe/v4/anime?&status=airing&min_score=8&type=tv&limit=4',
    'https://api.jikan.moe/v4/top/anime?limit=4',
    'https://api.jikan.moe/v4/seasons/now?limit=4',
    'https://api.jikan.moe/v4/genres/anime?limit=4',
    'https://api.jikan.moe/v4/anime?&q=',

  ];

  //const apiUrl = index === 5 ? `${apiUrls[index]}q=${searchQuery}` : apiUrls[index];
  const apiUrl = searchQuery ? `${apiUrls[index]}${searchQuery}&limit=16&sfw` : apiUrls[index];


  console.log(`URL: ${apiUrl}`)
  //const apiUrl = apiUrls[index];

  // Check if the data is already in the cache
  if (animeDataCache.has(apiUrl)) {
    console.log(`Retrieving data from cache for ${apiUrl}`);
    return animeDataCache.get(apiUrl);
  }

  // Create a promise that will resolve with the data when it's available
  const dataPromise = limit(() => new Promise((resolve) => {
    setTimeout(() => {
      fetch(apiUrl).then(res => res.json()).then(resolve);
    }, 500);
  }));

  // Add the promise to the queue
  animeDataPromiseQueue.push(dataPromise);

  // Wait for the promise to resolve and remove it from the queue
  const data = await dataPromise;
  animeDataPromiseQueue.splice(animeDataPromiseQueue.indexOf(dataPromise), 1);

  // Add the data to the cache
  animeDataCache.set(apiUrl, data);

  console.log('API:', apiUrl, 'called.');

  return data;
};

export default throttleGetAnimeData;