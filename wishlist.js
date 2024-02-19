const moviesIDInWishlist = JSON.parse(localStorage.getItem('wishListMovies'))
const contentDisplay = document.getElementById("content-display")


if(moviesIDInWishlist.length > 0){
    for(let movieID of moviesIDInWishlist){
        fetch(`http://www.omdbapi.com/?apikey=848ba33d&i=${movieID}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
            })
    }
}