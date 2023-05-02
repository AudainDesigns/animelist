import React, {useState, useEffect} from 'react';
import { XCircleFill } from "react-bootstrap-icons";


function WatchAnime({ animeClassName }) {

  const [isAnimeSaved, setIsAnimeSaved] = useState(false);

  const handleRemoveAnimeClick = (event) => {
    const animeList = JSON.parse(localStorage.getItem("animeList")) || [];

    // Find the closest parent element with a class name that starts with "anime-"
    const animeParent = event.target.closest("[class^='anime-']");
    if (!animeParent) {
      return;
    }

    // Retrieve the title of the anime to be removed
    const title = animeParent.querySelector("h4").textContent;

    // Filter out the anime to be removed from the animeList array
    const updatedAnimeList = animeList.filter((anime) => anime.title !== title);

    // Update the animeList array in local storage
    localStorage.setItem("animeList", JSON.stringify(updatedAnimeList));

    setIsAnimeSaved(false);
    alert("Anime removed successfully!");

    
  };

  useEffect(() => {
    
  }, []);

  return (
    <div className="add-anime" onClick={handleRemoveAnimeClick}>
        <XCircleFill className="remove-anime-icon" size={24} />
    </div>
  );
}

export default WatchAnime;