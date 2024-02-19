const contentDisplay = document.getElementById('content-display')
const searchInput = document.getElementById('movie-input')
let searchBtn = document.getElementById("search-btn")
let addedMovies = []

async function render(arr) {
    let html = ""
    for (movie of arr) {
        const movieRes = await fetch(`http://www.omdbapi.com/?t=${movie.Title}&apikey=848ba33d`)
        const movieData = await movieRes.json()
        console.log(movieData)

        if(movieData.Ratings.length > 0){
            html += `
            <div class="movie" id="${movieData.imdbID}">
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
                        <button type="button" class="addTo-el"><i class="fa-solid fa-plus"></i></button>
                    </div>
                    <span">${movieData.Plot}</span>
                </div>
            </div>
            `
        }else continue
    }
    document.getElementById("spinner").style.display="none";
    document.getElementById("body").style.display = "block"
    contentDisplay.style.display = "block"
    contentDisplay.innerHTML = html
    

    const addBtns = document.querySelectorAll('.addTo-el')
    const addBtnsArr = [...addBtns]

    for (let i = 0; i < addBtnsArr.length; i++) {
        addBtnsArr[i].addEventListener('click', () => {
            let movieID = addBtnsArr[i].parentElement.parentElement.parentElement.id
            console.log(movieID)
        })
    }

}

searchBtn.addEventListener("click", async () => {
    const res = await fetch(` http://www.omdbapi.com/?s=${searchInput.value}&apikey=848ba33d`)
    const data = await res.json()

    if (data.Error) {
        console.log(data)
        document.getElementById("body").style.display = "inherit"
        contentDisplay.innerHTML = `<h3>Unable to find what you're looking for. Please try another search</h3>`
    }
    else if (data.Search) {
        let moviesArr = data.Search
        moviesArr = moviesArr.slice(0, 5)
        contentDisplay.style.display = "none"
        document.getElementById("body").style.display = "inherit"
        document.getElementById("spinner").style.display="block";
        render(moviesArr)
    }
})