export const getAnimeData = async (index) => {
    const apiUrls = [
        'https://api.jikan.moe/v4/anime?&status=airing&min_score=8&type=tv&limit=4',
        'https://api.jikan.moe/v4/top/anime?limit=4',
        'https://api.jikan.moe/v4/seasons/now?limit=4',
        'https://api.jikan.moe/v4/genres/anime?limit=4'
    ];

    const response = await fetch(apiUrls[index]);
    const data = await response.json();

    return data;
}
