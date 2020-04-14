import axios from 'axios';
import * as actionTypes from './ActionTypes';


//get all data on the first mount

export const updateMovies = movies => {

    return {
        type: actionTypes.MOVIE_UPDATE,
        value: movies
    }
}

export const updateToWatchedMovies = movies => {

    return {
        type: actionTypes.MOVIE_TOWATCH_UPDATE,
        value: movies
    }
}

export const updateWatchedMovies = movies => {

    return {
        type: actionTypes.MOVIE_WACHED,
        value: movies
    }
}


export const getDataFromFirebase = () => {

    return dispatch => {
        axios.get('https://movieappdatacubesfp.firebaseio.com/movies.json')
            .then(res => {

                const toWatchData = formatData(res.data).filter((movie) => {
                    return movie.status.includes('toWatch')
                })

                const watchedData = formatData(res.data).filter((movie) => {
                    return movie.status.includes('watched')
                })

                dispatch(updateToWatchedMovies(toWatchData));
                dispatch(updateWatchedMovies(watchedData));
                dispatch(updateFilterMovies(toWatchData))
                dispatch(updateMovies(formatData(res.data)));
            })
    }
}

const formatData = (responseData) => {
    const data = [];
    for (const item in responseData) {
        data.push({
            ...responseData[item],
            fireBaseId: item,
        })
    }
    return data;
}

export const updateToWatchMoviesData = () => {

    return (dispatch, getState) => {
        let mainData = {
            ...getState()
        };

        const toWatchData = mainData.allMoviesData.filter(movie => {
            return movie.status.includes('toWatch')
        })
        dispatch(updateToWatchedMovies(toWatchData));
        dispatch(updateFilterMovies(toWatchData));
    }
}

export const updateWatchedMoviesData = () => {

    return (dispatch, getState) => {
        let mainData = {
            ...getState()
        };
        const watchedData = mainData.allMoviesData.filter(movie => {
            return movie.status.includes('watched')
        })
        dispatch(updateWatchedMovies(watchedData));
    }
}

//search btn klik

export const updateSearchBtnClick = value => {

    return {
        type: actionTypes.SEARCH_BTN,
        value: !value
    }
}

export const btnSearchIsClicked = (value) => {

    return dispatch => {
        dispatch(updateSearchBtnClick(value));
        dispatch(updateTyping(false));
        dispatch(updateString(''));
        resetInputValue();
    }
}

const resetInputValue = () => {
    const myInput = document.getElementById("search");
    myInput.value = '';
}

//Search data

export const updateTyping = value => {

    return {
        type: actionTypes.TYPING,
        value: value
    }
}

export const updateSearchData = value => {

    return {
        type: actionTypes.SEARCH_DATA_UPDATE,
        value: value
    }
}

export const updateString = value => {

    return {
        type: actionTypes.STRING,
        value: value
    }
}

export const searchFetch = (word) => {

    return (dispatch, getState) => {

        let txt = word.target.value;

        dispatch(updateString(txt))

        if (txt === '') {
            dispatch(updateTyping(false));
        }

        if (txt) {
            dispatch(updateTyping(true));

            axios.get(`http://www.omdbapi.com/?s=${ txt }&apikey=b980b84d&type=movie`)
                .then(res => {

                    if (res.data['Response'] === 'True') {
                        dispatch(updateSearchData(res.data['Search']));
                    }
                })
        }
    }
}

//loaders activity

export const loaderActivity = (value) => {

    return {
        type: actionTypes.LOADER_UPDATE,
        value: !value
    }
}

export const homePageloaderActivity = (value) => {

    return {
        type: actionTypes.HOME_PAGE_LOADER_UPDATE,
        value: value
    }
}

export const nextPageloaderActivity = (value) => {

    return {
        type: actionTypes.NEXT_PAGE_LOADER_UPDATE,
        value: value
    }
}

export const activeNextPageLoader = () => {

    return dispatch => {
        dispatch(nextPageloaderActivity(true))
        setTimeout(() => {
            dispatch(nextPageloaderActivity(false))
        }, 2000)
    }
}


export const activeHomePageLoader = () => {

    return dispatch => {
        dispatch(homePageloaderActivity(true))
        setTimeout(() => {
            dispatch(homePageloaderActivity(false))
        }, 5100)
    }
}



//add movie to movie to watch

export const addMovie = (item) => {

    let itemId = item.imdbID;
    return (dispatch, getState) => {

        axios.get(`http://www.omdbapi.com/?i=${ itemId }&apikey=b980b84d&type=movie`)
            .then(movieData => {
                dispatch(loaderActivity(true))
                const movieId = movieData.data.imdbID;

                const moviesToWatchData = getState().allMoviesData.every((movie) => {
                    return movie.imdbID !== movieId
                })

                if (moviesToWatchData) {
                    movieData.data.status = 'toWatched';
                    getMovieData(movieData);

                    dispatch(getDataFromFirebase())
                } else {
                    dispatch(showNotification(item.Title, 'exist'))
                }
            })
            .then(dispatch(getDataFromFirebase()))
            .then(
                dispatch(loaderActivity(false))
            )
            .then(dispatch(showNotification(item.Title, 'add')))
    }
}


const getMovieData = (data) => {

    let film = data.data
    fetch('https://movieappdatacubesfp.firebaseio.com/movies.json', {
        method: 'POST',
        body: JSON.stringify(film)
    })
}

//delete movie 

export const deleteMovieFromTheData = (movie) => {
    let itemId = movie.fireBaseId;
    return dispatch => {

        axios.delete(`https://movieappdatacubesfp.firebaseio.com/movies/${ itemId }.json`)
            .then(loaderActivity(true))
            .then(() => dispatch(getDataFromFirebase()))
            .then(loaderActivity(false))
            .then(dispatch(showNotification(movie.Title, 'del')))
    }
}

//adding to watched movie list

export const addingMovieToToWatchedData = (movie, movies) => {
    let itemId = movie.fireBaseId;
    return dispatch => {
        axios.patch(`https://movieappdatacubesfp.firebaseio.com/movies/${ itemId }.json`, {
                status: 'watched'
            })
            .then(() => dispatch(getDataFromFirebase()))
            .then(dispatch(showNotification(movie.Title, 'move')))
    }
}


//filter btn klik i geting filter data 

export const updateFilterBtnClick = value => {

    return {
        type: actionTypes.FILTER_BTN,
        value: !value
    }
}

export const updateFilterMovies = movies => {

    return {
        type: actionTypes.MOVIE_FILTER_UPDATE,
        value: movies
    }
}

export const updateMoviesGenreData = movies => {

    return {
        type: actionTypes.MOVIE_GENRE_UPDATE,
        value: movies
    }
}


export const btnFilterIsClicked = (value) => {

    return dispatch => {
        dispatch(setGenreState())
        dispatch(updateFilterBtnClick(value))
    }
}

export const setGenreState = () => {

    return (dispatch, getState) => {
        let genresData = {
            ...getState()
        };
        let genres = genresData.toWatchedData.map((movie) => {
            return movie.Genre.split(',')
        })

        const genresArr = [];

        for (let i = 0; i < genres.length; i++) {
            for (let j = 0; j < genres[i].length; j++) {

                const genreMatch = genresArr.every((movie) => {
                    return movie !== genres[i][j]
                })

                if (genreMatch) {
                    genresArr[genresArr.length] = genres[i][j];
                }
            }
        }
        dispatch(updateMoviesGenreData(genresArr));
    }
}

export const filterGenres = (zanr) => { 

    return (dispatch, getState) => {
        dispatch(loaderActivity(false));
        let data = {
            ...getState()
        };
        let dataF = data.toWatchedData;

        const dataForFilter = dataF.filter((film) => {
            return film.Genre.includes(zanr)
        })

        dispatch(updateFilterMovies(dataForFilter));
        dispatch(loaderActivity(true));
    }
}

export const resetGenresFilter = () => { 

    return (dispatch, getState) => {

        let data = {
            ...getState()
        };
        let dataF = data.toWatchedData;

        dispatch(loaderActivity(false));
        dispatch(updateFilterMovies(dataF));
        dispatch(loaderActivity(true));
    }
}

//movie up or down

export const move = (array, from, to) => {
    if (to < 0 || to === array.length) return array;

    var target = array[from];
    var increment = to < from ? -1 : 1;

    for (var k = from; k !== to; k += increment) {
        array[k] = array[k + increment];
    }
    array[to] = target;
    return array;
}


export const moveMovieUpOrDown = (movie, status) => {

    return (dispatch, getState) => {
        dispatch(loaderActivity(false))
        let data = {
            ...getState()
        };
        let dataF = data.filteredData;
        let fromIndex = dataF.indexOf(movie);
        let toIndex;

        status ? toIndex = fromIndex + 1 : toIndex = fromIndex - 1
        let newData = move(dataF, fromIndex, toIndex)

        dispatch(loaderActivity(true));
        dispatch(updateFilterMovies(newData));
    }
}

//new page about the movie

export const updateMovieDetailsData = (movie, movieID, show) => {

    return {
        type: actionTypes.MOVIE_DETAILS_UPDATE,
        value: movie,
        secondValue: movieID,
        showPage: show
    }
}

export const showMovie = (id) => {

    return dispatch => {
        axios.get(`http://www.omdbapi.com/?i=${ id }&apikey=b980b84d&type=movie`)
            .then(res => {

                let mData = res.data;
                let mId = res.data.imdbID;
                let mShow = true;
                dispatch(updateMovieDetailsData(mData, mId, mShow))
            })
    }
}

//notifications 

export const updateNotification = (status, title, color) => {

    return {
        type: actionTypes.NOTIFICATION_UPDATE,
        value: status,
        title: title,
        color: color
    }
}

export const showNotification = (title, color) => {

    return dispatch => {
        dispatch(updateNotification(true, title, color))
        setTimeout(() => {
            dispatch(updateNotification(false, title, color))
        }, 2500)
    }
}