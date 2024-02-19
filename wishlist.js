const moviesIDInWishlist = JSON.parse(localStorage.getItem('wishListMovies'))
const contentDisplay = document.getElementById("content-display")
console.log(moviesIDInWishlist)
async function render(arr) {
    let html = ""
    for (let movie of arr) {
        const movieRes = await fetch(`http://www.omdbapi.com/?i=${movie}&apikey=848ba33d`)
        const movieData = await movieRes.json()
        console.log(movieData)
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
                    <button type="button" class="delete-from"> -- </button>
                </div>
                <span">${movieData.Plot}</span>
            </div>
        </div>
        `
    }
    body.style.display = "block"
    contentDisplay.style.display = "block"
    contentDisplay.innerHTML = html

    const deleteBtns = document.querySelectorAll(".delete-from")
    const deleteBtnsArr = [...deleteBtns]

    for (let i = 0; i < deleteBtnsArr.length; i++) {
        deleteBtnsArr[i].addEventListener('click', () => {
            let movieID = deleteBtnsArr[i].parentElement.parentElement.parentElement.id
            deleteFromLocalStorage(movieID)
        })
    }
}

if(moviesIDInWishlist.length > 0){
    render(moviesIDInWishlist)
}

function deleteFromLocalStorage(movieID){
    localStorage.removeItem("wishListMovies", movieID)
    console.log(localStorage.getItem("wishListMovies"))
}