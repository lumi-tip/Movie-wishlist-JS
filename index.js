const contentDisplay = document.getElementById('content-display')
const searchInput = document.getElementById('movie-input')
const body = document.getElementById('body')
const spinner = document.getElementById('spinner')
let searchBtn = document.getElementById("search-btn")
let moviesInWishlist = []

async function render(moviesSavedArr) {
    let html = ""
    for (movie of moviesSavedArr) {
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
    spinner.style.display="none";
    body.style.display = "block"
    contentDisplay.style.display = "block"
    contentDisplay.innerHTML = html
    
    const addBtns = document.querySelectorAll('.addTo-el')
    const addBtnsArr = [...addBtns]

    for (let i = 0; i < addBtnsArr.length; i++) {
        addBtnsArr[i].addEventListener('click', () => {
            let movieID = addBtnsArr[i].parentElement.parentElement.parentElement.id
            addToLocalStorage(movieID)
            alert("added to wishlist")
        })
    }
}

searchBtn.addEventListener("click", async () => {
    const res = await fetch(` http://www.omdbapi.com/?s=${searchInput.value}&apikey=848ba33d`)
    const data = await res.json()

    if (data.Error) {
        body.style.display = "inherit"
        contentDisplay.innerHTML = `<h3>Unable to find what you're looking for. Please try another search</h3>`
    }
    else if (data.Search) {
        let moviesArr = data.Search
        moviesArr = moviesArr.slice(0, 5)
        contentDisplay.style.display = "none"
        body.style.display = "inherit"
        spinner.style.display="block";
        render(moviesArr)
    }
})

function addToLocalStorage(movieID){
    let recoveredData = localStorage.getItem('wishListMovies')
    if(recoveredData == null){
        moviesInWishlist.push(movieID)
        localStorage.setItem('wishListMovies', JSON.stringify(moviesInWishlist))
    }else if(JSON.parse(recoveredData).includes(movieID)){
        alert("This movie is already in your wishlist")
    }else{
        let data = JSON.parse(recoveredData)
        data.push(movieID)
        localStorage.setItem('wishListMovies', JSON.stringify(data))
    }
}