import React from 'react'

export const Player = () => {
    const fallbackComponent = (
        <div className="player-wrapper">
            <iframe
                width='100%'
                height='100%'
                src=""
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                frameBorder="0"
                allowFullScreen
            ></iframe>
        </div>
    );
  return (
    <div>Player</div>
  )
}
