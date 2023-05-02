import React from 'react';
import { PlusCircleFill } from "react-bootstrap-icons";


function WatchAnime({ animeClassName }) {

  const handleAddAnimeClick = event => {
    const animeList = JSON.parse(localStorage.getItem("animeList")) || [];


    // Find the closest parent element with a class name that starts with "anime-"
    const animeParent = event.target.closest("[class^='anime-']");
    if (!animeParent) {
      return;
    }

    // Retrieve the title and image URL from the child elements of the anime parent
    const title = animeParent.querySelector("h4").textContent;
    const jptitle = animeParent.querySelector("h5").textContent;
    const year = animeParent.querySelector(".anime-year").textContent;
    const status = animeParent.querySelector(".anime-status").textContent;
    const episodes = animeParent.querySelector(".anime-episodes").textContent;
    const imageUrl = animeParent.querySelector("img").src;

    // Check if the anime is already present in the animeList array
    const isAnimeAlreadySaved = animeList.some(anime => anime.title === title);
    if (isAnimeAlreadySaved) {
      alert("Anime is already saved!");
      return;
    }

    // Create an object to store the anime data
    const animeData = { title, jptitle, year, status, episodes, imageUrl };



    // Add the anime data object to the animeList array in local storage
    animeList.push(animeData);
    localStorage.setItem("animeList", JSON.stringify(animeList));

    alert("Anime added successfully!");

  };

  return (
    <div className='add-anime' onClick={handleAddAnimeClick}>
      <PlusCircleFill className='add-anime-icon' size={24} />
    </div>
  );
}

export default WatchAnime;