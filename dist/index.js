const contentDisplay = document.getElementById('content-display')
const searchInput = document.getElementById('movie-input')
const body = document.getElementById('body')
const spinner = document.getElementById('spinner')
const searchBtn = document.getElementById("search-btn")
let moviesInWishlist = []

async function render(moviesSavedArr) {
    let html = ""
    for (movie of moviesSavedArr) {
        const movieRes = await fetch(`http://www.omdbapi.com/?t=${movie.Title}&apikey=848ba33d`)
        const movieData = await movieRes.json()
        console.log(movieData)

        if(movieData.Ratings.length > 0){
            html += `
            <div class="movie flex flex-wrap justify-center mb-2.5" id="${movieData.imdbID}">
                <img class="poster rounded-xl" src="${movieData.Poster}" alt="Poster of ${movieData.Title}"/>
                <div class="movie-info-wrapper px-2.5 py-2.5 flex flex-col justify-center items-center text-white">
                    <div class="flex justify-center gap-2 px-4 pb-2.5">
                        <h3 class="movie-title p-0 text-white text-xl text-start">${movieData.Title}</h3>
                        <div class="self-center">
                            <i class="fa-solid fa-star text-sm" style="color:yellow"></i>
                            <span class="text-white text-sm">${movieData.Ratings[0].Value}</span>
                        </div>
                    </div>
                    <div class="duration-wrapper flex justify-evenly items-center gap-2">
                        <span class="movie-data text-white">${movieData.Runtime}</span>
                        <span class="text-white">${movieData.Genre}</span>
                        <button class="whishlistBtn rounded-full bg-white border-0 flex" type="button">
                            <i class="fa-solid fa-plus text-black grow mt-0.5"></i>
                        </button>
                    </div>
                    <span class="text-white pt-2.5 px-4" style="text-align:start">${movieData.Plot}</span>
                </div>
            </div>
            `
        }else continue
    }
    spinner.style.display="none";
    body.style.display = "block"
    contentDisplay.style.display = "block"
    contentDisplay.innerHTML = html
    
    const addBtns = document.querySelectorAll('.whishlistBtn')
    const addBtnsArr = [...addBtns]

    for (let i = 0; i < addBtnsArr.length; i++) {
        addBtnsArr[i].addEventListener('click', () => {
            let movieID = addBtnsArr[i].parentElement.parentElement.parentElement.id
            addToLocalStorage(movieID)
        })
    }
}

searchBtn.addEventListener("click", async () => {
    const res = await fetch(` http://www.omdbapi.com/?s=${searchInput.value}&apikey=848ba33d`)
    const data = await res.json()

    if (data.Error) {
        body.style.display = "flex"
        contentDisplay.innerHTML = `<h3 class="text-xl font-bold px-4">Unable to find what you're looking for. Please try another search</h3>`
    }
    else if (data.Search) {
        let moviesArr = data.Search
        moviesArr = moviesArr.slice(0, 5)
        contentDisplay.style.display = "none"
        body.style.display = "flex"
        spinner.style.display="block";
        render(moviesArr)
    }
})

function addToLocalStorage(movieID){
    let recoveredData = localStorage.getItem('wishListMovies')
    if(recoveredData == null){
        moviesInWishlist.push(movieID)
        localStorage.setItem('wishListMovies', JSON.stringify(moviesInWishlist))
        alert("Added to your wishlist")
    }else if(JSON.parse(recoveredData).includes(movieID)){
        alert("This movie is already in your wishlist")
    }else{
        alert("Added to your wishlist")
        let data = JSON.parse(recoveredData)
        data.push(movieID)
        localStorage.setItem('wishListMovies', JSON.stringify(data))
    }
}