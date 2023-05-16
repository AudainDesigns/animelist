import React, { useState, useEffect } from 'react';
import { PlusCircleFill, XCircleFill } from 'react-bootstrap-icons';

function WatchAnime({ title, jptitle, imageUrl, year, status, episodes }) {
  const [isAnimeSaved, setIsAnimeSaved] = useState(false);

  useEffect(() => {
    const animeList = JSON.parse(localStorage.getItem('animeList')) || [];
    const isAnimeAlreadySaved = animeList.some((anime) => anime.title === title);
    setIsAnimeSaved(isAnimeAlreadySaved);
  }, [title]);

  const handleAnimeClick = () => {
    const animeList = JSON.parse(localStorage.getItem('animeList')) || [];
    const isAnimeAlreadySaved = animeList.some((anime) => anime.title === title);

    if (isAnimeAlreadySaved) {
      const updatedAnimeList = animeList.filter((anime) => anime.title !== title);
      localStorage.setItem('animeList', JSON.stringify(updatedAnimeList));
      setIsAnimeSaved(false);
      alert('Anime removed successfully!');
    } else {
      const animeData = {
        title,
        jptitle,
        imageUrl,
        year,
        status,
        episodes
      };
      animeList.push(animeData);
      localStorage.setItem('animeList', JSON.stringify(animeList));
      setIsAnimeSaved(true);
      alert('Anime added successfully!');
    }
  };

  return (
    <div className="add-anime" onClick={handleAnimeClick}>
      {isAnimeSaved ? (
        <XCircleFill className="remove-anime-icon" size={24} />
      ) : (
        <PlusCircleFill className="add-anime-icon" size={24} />
      )}
    </div>
  );
}

export default WatchAnime;