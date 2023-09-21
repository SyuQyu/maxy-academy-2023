$(document).ready(function () {
    console.log('jQuery is working.');
    let searchText = "";

    $('#searchInput').keypress(function (event) {
        searchText = $('#searchInput').val();
        console.log('Search Text:', searchText);
    });
    if (window.location.href.indexOf('favorite') > -1) {
        getFavoriteMovies()
            .then(function (data) {
                console.log(data);
                displayFavoritedMovies(data);
            })
            .catch(function (error) {
                console.error("Error: ", error);
            });
    } else {
        getMovies()
            .then(function (data) {
                displayMovies(data);
            })
            .catch(function (error) {
                console.error("Error: ", error);
            });
    }
});

function getMovies() {
    return new Promise((resolve, reject) => {
        $.get("https://api.tvmaze.com/shows",
            function (data, textStatus, jqXHR) {
                resolve(data);
            }
        ).fail(function (jqXHR, textStatus, errorThrown) {
            reject(errorThrown);
        });
    });
}


function getFavoriteMovies() {
    return new Promise((resolve, reject) => {
        $.get("http://localhost:3000/favoriteFilm",
            function (data, textStatus, jqXHR) {
                resolve(data);
            }
        ).fail(function (jqXHR, textStatus, errorThrown) {
            reject(errorThrown);
        });
    });
}

function addFavoriteMovie(movieName, movieImage, movieGenre, movieSummary) {
    console.log(movieName, movieImage);
    data = {
        "image": movieImage,
        "name": movieName,
        "genres": movieGenre,
        "summary": movieSummary
    }
    console.log(data);
    $.ajax({
        type: "POST",
        url: "http://localhost:3000/favoriteFilm",
        data: data,
        success: function (data) {
            alert("Berhasil ditambahkan ke favorite");
        }
    });
}

function hapusDariFavorite(movieId) {
    $.ajax({
        url: "http://localhost:3000/favoriteFilm/" + movieId,
        type: "DELETE",
        success: function (data) {
            console.log(`${data} berhasil dihapus`);
        }
    });
}

function searchMovies(searchText) {
    return new Promise((resolve, reject) => {
        $.get("https://api.tvmaze.com/search/shows?q=" + searchText,
            function (data, textStatus, jqXHR) {
                resolve(data);
            }
        ).fail(function (jqXHR, textStatus, errorThrown) {
            reject(errorThrown);
        });
    });
}

function displayMovies(movies) {
    const moviesRow = $('#movies-row');
    movies.forEach(movie => {
        const summaryCleaned = movie.summary.replace(/<\/?[^>]+(>|$)|"|\/|-|'/g, '');
        const card = `
            <div class="col d-flex justify-content-center align-items-start mb-5">
                <div class="card">
                    <img src="${movie.image.medium}" class="card-img-top" alt="${movie.name}">
                    <div class="card-body">
                        <h5 class="card-title">${movie.name}</h5>
                        ${movie.genres.map(genre => `<span class="badge me-2 bg-secondary">${genre}</span>`)?.join('')}
                        <hr>
                        <p class="card-text">${movie.summary}</p>
                    </div>
                    <button type="button" onclick="addFavoriteMovie('${movie.name}', '${movie.image.medium}', '${movie.genres}', '${summaryCleaned}')" class="btn btn-outline-primary">Tambah ke Favorite</button>
                </div>
            </div>`;
        moviesRow.append(card);
    });
}

function displayFavoritedMovies(movies) {
    const moviesRow = $('#favorites-row');
    movies.forEach(movie => {
        const card = `
            <div class="col d-flex justify-content-center align-items-start mb-5">
                <div class="card">
                    <img src="${movie.image}" class="card-img-top" alt="${movie.name}">
                    <div class="card-body">
                        <h5 class="card-title">${movie.name}</h5>
                        ${movie.genres?.split(",")?.map(genre => `<span class="badge me-2 bg-secondary">${genre}</span>`)?.join('')}
                        <hr>
                        <p class="card-text">${movie.summary}</p>
                    </div>
                    <button type="button" onclick="hapusDariFavorite('${movie.id}')" class="btn btn-outline-primary">Hapus dari Favorite</button>
                </div>
            </div>`;
        moviesRow.append(card);
    });
}