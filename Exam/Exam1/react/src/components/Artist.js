import React from "react";

const Artist = ({ artist }) => {
    const {artistName, collectionName, collectionViewUrl, artworkUrl60} = artist;
    
    return(
        <> 
            <div>
                <h2>Here you go!</h2>
                <h3>{artistName}</h3>
                <h4>{collectionName}</h4>
                <a href={collectionViewUrl} rel="noreferrer" target="_blank"><img src={artworkUrl60} alt="artist" /></a>
            </div>
        </>
    )

}

export default Artist