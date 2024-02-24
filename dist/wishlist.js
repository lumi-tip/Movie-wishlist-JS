let moviesIDInWishlist = JSON.parse(localStorage.getItem('wishListMovies'))
const contentDisplay = document.getElementById("content-display")

async function render(arr) {
    if(arr.length > 0){
        let html = ""
        for (let movie of arr) {
            const movieRes = await fetch(`http://www.omdbapi.com/?i=${movie}&apikey=848ba33d`)
            const movieData = await movieRes.json()
            html += `
            <div class="movie flex flex-wrap justify-center gap-2.5 mb-2.5" id="${movieData.imdbID}">
                <img class="poster rounded-xl" src="${movieData.Poster}" alt="Poster of ${movieData.Title}"/>
                <div class="px-2.5 py-1.5 flex flex-col justify-center items-center text-white gap-5">
                    <div class="flex justify-center gap-2">
                        <h3 class="p-0 text-white">${movieData.Title}</h3>
                        <div>
                            <i class="fa-solid fa-star" style="color:yellow"></i>
                            <span class="text-white">${movieData.Ratings[0].Value}</span>
                        </div>
                    </div>
                    <div class="flex justify-evenly items-center gap-2">
                        <span class="movie-data text-white">${movieData.Runtime}</span>
                        <span class="text-white">${movieData.Genre}</span>
                        <button type="button" class="whishlistBtn rounded-full bg-white border-0 flex">
                            <i class=" text-black fa-solid fa-minus grow mt-0.5"></i>
                        </button>
                    </div>
                    <p class="text-white text-center pt-2.5">${movieData.Plot}</p>
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
            <span class="whishlistBtn rounded-full bg-white border-0 flex><i class="fa-solid fa-plus grow self-center text-black"></i></span> 
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

