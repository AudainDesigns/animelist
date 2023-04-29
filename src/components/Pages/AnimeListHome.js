import React from 'react'

export const AnimeListHome = () => {
    return (
        <>
            <div className="anime-display--featured-container">
                <AnimeFetch title="" sm="12" md="12" lg="12" fetchtype="featured" data={featuredData} />
            </div><div className="anime-display--search-container">
                <AnimeFetch title="Airing Anime" sm="12" md="6" lg="3" fetchtype="airing-anime" data={animeData[0]?.data || []} />
                <AnimeFetch title="Top Anime" sm="12" md="6" lg="3" fetchtype="top-anime" data={animeData[1]?.data || []} />
                <AnimeFetch title="Seasonal Anime" sm="12" md="6" lg="3" fetchtype="seasonal-anime" data={animeData[2]?.data || []} />
            </div>
        </>
    )
}
