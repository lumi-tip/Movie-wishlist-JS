let moviesIDInWishlist = JSON.parse(localStorage.getItem('wishListMovies'))
const contentDisplay = document.getElementById("content-display")

async function render(arr) {
    if(arr.length > 0){
        let html = ""
        for (let movie of arr) {
            const movieRes = await fetch(`https://www.omdbapi.com/?i=${movie}&apikey=848ba33d`)
            const movieData = await movieRes.json()
            console.log(movieData.imdbID)
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
                        <button type="button" class="whishlistBtn rounded-full bg-white border-0 flex">
                            <i class="text-black fa-solid fa-minus grow mt-0.5"></i>
                        </button>
                    </div>
                    <p class="text-white text-justify pt-2.5 px-4">${movieData.Plot}</p>
                </div>
            </div>
            `
        }
        spinner.style.display="none";
        body.style.display = "block"
        contentDisplay.style.display = "block"
        contentDisplay.innerHTML = html
    
        const deleteBtns = document.querySelectorAll(".whishlistBtn")
        const deleteBtnsArr = [...deleteBtns]
    
        for (let i = 0; i < deleteBtnsArr.length; i++) {
            deleteBtnsArr[i].addEventListener('click', () => {
                let movieID = deleteBtnsArr[i].parentElement.parentElement.parentElement.id
                deleteFromLocalStorage(movieID)
            })
        }
    }else{
        body.style.display = "flex"
        contentDisplay.innerHTML = `
            <h2 class="text-3xl font-bold px-4">Your watchlist is looking a little empty</h2>
            <a class="flex justify-center items-center mt-5 gap-2.5 text-white" href="index.html" id="backToSearch-btn">
                <span class="whishlistBtn rounded-full bg-white border-0 flex text-black>
                    <i class="text-black fa-solid fa-plus grow self-center"></i>
                </span> 
                Let's add some movies!
            </a>
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

