let moviesIDInWishlist = JSON.parse(localStorage.getItem('wishListMovies'))
const contentDisplay = document.getElementById("content-display")

async function render(arr) {
    if(arr.length > 0){
        let html = ""
        for (let movie of arr) {
            const movieRes = await fetch(`http://www.omdbapi.com/?i=${movie}&apikey=848ba33d`)
            const movieData = await movieRes.json()
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
                        <button type="button" class="delete-from"><i class="fa-solid fa-minus btn-add-del"></i></button>
                    </div>
                    <span">${movieData.Plot}</span>
                </div>
            </div>
            `
        }
        spinner.style.display="none";
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
    }else{
        body.style.display = "inherit"
        contentDisplay.innerHTML = `
            <h2>Your watchlist is looking a little empty</h2>
            <a href="index.html" id="backToSearch-btn"><span><i class="fa-solid fa-plus"></i></span> Let's add some movies!</a>
        `
    }
}

if(moviesIDInWishlist.length > 0){
    contentDisplay.style.display="none"
    spinner.style.display="block"
    render(moviesIDInWishlist)
}

function deleteFromLocalStorage(movieID){
    let newMoviesArr = []
    for(let movieId of moviesIDInWishlist){
        if(movieId !== movieID){
            newMoviesArr.push(movieId)
        }
    }
    localStorage.setItem("wishListMovies", JSON.stringify(newMoviesArr));
    moviesIDInWishlist = JSON.parse(localStorage.getItem('wishListMovies'))
    render(moviesIDInWishlist)
}

