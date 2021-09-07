const getArtist = () => {
    let ARTIST_NAME = $("#artist-name").val();
    let searchURL = `https://itunes.apple.com/search?term=${ARTIST_NAME}&media=music&entity=album&attribute=artistTerm&limit=200`;
    
    fetchJsonp(searchURL)
    .then(res => res.json())
    .then(responseJson => {
        let response = responseJson.results
        displayResults(response)
    })
    .catch(error => console.log(error));
}

function displayResults(response) {
    //console.log(response)
    $("#results-list").empty();

    let results = "";
  
    response.forEach((result) => {
            results +=
            `<div id="result-card">
                <h3>${result.artistName}</h3>
                <h4>${result.collectionName}</h4>
                <a href="${result.collectionViewUrl}"><img src="${result.artworkUrl60}" alt="artistViewUrl"/></a>
            </div>`
        
    });

    $("#results").removeClass("hidden");
    $("#results-list").html(results);
    $("#title").removeClass("visible").addClass("hidden");
};

const watchForm = () => {
    $("form").submit(event => {
        event.preventDefault();
        getArtist();
    });
}

const main = () => {
    watchForm()
}

$(main)