import React from 'react';
import { Helmet } from 'react-helmet';

export const Head = (props) => {
    const { metaTitle, description, image } = props;
    const currentUrl = window.location.href;

    return (
        <Helmet>
            <meta charSet="utf-8" />
            <title>{metaTitle}</title>
            <link rel="canonical" href={currentUrl} />
            <meta name="description" content={description} />
            <meta property="og:title" content={metaTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="og:type" content="website" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={metaTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />
        </Helmet>
    )
}