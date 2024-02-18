const contentDisplay = document.getElementById('content-display')
const searchInput = document.getElementById('movie-input')
let searchBtn = document.getElementById("search-btn")

async function render(arr){
    let html = ""
    for(movie of arr){
        const movieRes = await fetch(`http://www.omdbapi.com/?t=${movie.Title}&apikey=848ba33d`)
        const movieData = await movieRes.json()
        console.log(movieData)
        html += `
        <div class="movie">
            <img src="${movieData.Poster}" alt="Poster of ${movieData.Title}"/>
            <div class="description-wrapper">
                <div class="title-wrapper">
                    <h3>${movieData.Title}</h3>
                    <div>
                        <i class="fa-solid fa-star" style="color:yellow"></i>
                        <span>${movieData.Ratings[0].Value}</span>
                    </div>
                </div>
                <div class="genre-wrapper">
                    <span class="movie-data">${movieData.Runtime}</span>
                    <span>${movieData.Genre}</span>
                    <button class="addTo-el"><i class="fa-solid fa-plus"></i></button>
                </div>
                <span">${movieData.Plot}</span>
            </div>
        </div>
        `
    }
    document.getElementById("body").style.display = "block"
    contentDisplay.innerHTML = html
}

searchBtn.addEventListener("click",async () =>{
    const res = await fetch(` http://www.omdbapi.com/?s=${searchInput.value}&apikey=848ba33d`)
    const data = await res.json()

    if(data.Error){
        contentDisplay.innerHTML = `<h3>Unable to find what you're looking for. Please try another search</h3>`
    }
    else if(data.Search){
        let moviesArr = data.Search
        render(moviesArr)
    }

})