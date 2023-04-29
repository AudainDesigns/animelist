import React from 'react';
import { Helmet } from 'react-helmet';
//import { useLocation } from 'react-router-dom';

export const Head = (props) => {
    const { title, description, image } = props;

    const currentUrl = window.location.href;
    //For Local Testing
    //const currentUrl = `${window.location.origin}${location.pathname}${location.search}`;


    return (
        <Helmet>
            <meta charSet="utf-8" />
            <title>{title}</title>
            <link rel="canonical" href={currentUrl} />
            <meta name="description" content={description} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="og:type" content="website" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />
        </Helmet>
    )
}