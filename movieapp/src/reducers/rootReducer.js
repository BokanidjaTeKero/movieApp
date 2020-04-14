
import * as actionTypes from '../actions/ActionTypes';

export const initialState = {
    // apiKey: 'b980b84d',
    movies: [ ],
    allMoviesData: [],
    toWatchedData: [],
    watchedData : [],
    filteredData : [],
    searchData : {
        'Search' : []
    },
    genres: [],
    movieDetails : {},
    pageID : '',
    string: '',
    filterBtn: false,
    searchBtn: false,
    typing: false,
    loader: false,
    showPage : false,
    nextPageLoader : false,
    homePageLoader : false,
    notification : {
        status : false,
        title : '',
        color : '',
        action : {
            add : ' has been added to the watchlist.',
            del : ' has been deleted.',
            move : ' has been watched.',
            exist : ' has already been added'
        }
    }
}


const rootReducer = (state = initialState, action) => {

    switch(action.type) {

        case actionTypes.MOVIE_UPDATE:
            return {
                ...state,
                allMoviesData : action.value
            };

        case actionTypes.MOVIE_TOWATCH_UPDATE:
            return {
                ...state,
                toWatchedData : action.value,
                filteredData : action.value
            };

        case actionTypes.MOVIE_WACHED:
            return {
                ...state,
                watchedData : action.value,
            }; 
            
        case actionTypes.SEARCH_DATA_UPDATE:
            return {
                ...state,
                searchData : action.value
            }; 

        case actionTypes.MOVIE_FILTER_UPDATE:
            return {
                ...state,
                filteredData : action.value,
            }; 

        case actionTypes.MOVIE_GENRE_UPDATE:
            return {
                ...state,
                genres : action.value
            }  

        case actionTypes.TYPING:
            return {
                ...state,
                typing : action.value
            };   
            
        case actionTypes.STRING:
            return {
                ...state,
                string : action.value
            }; 

        case actionTypes.SEARCH_BTN:
            return {
                ...state,
                searchBtn : action.value
            }; 

        case actionTypes.FILTER_BTN:
            return {
                ...state,
                filterBtn : action.value
            };   
        
        case actionTypes.LOADER_UPDATE:
            return {
                ...state,
                loader : action.value
            };  

        case actionTypes.MOVIE_DETAILS_UPDATE:
            return {
                ...state,
                movieDetails : action.value,
                pageID : action.secondValue,
                showPage : action.showPage
            };  
            
        case actionTypes.NEXT_PAGE_LOADER_UPDATE:
            return {
                ...state,
                nextPageLoader : action.value
            }; 

        case actionTypes.HOME_PAGE_LOADER_UPDATE:
            return {
                ...state,
                homePageLoader : action.value
            }; 

        case actionTypes.NOTIFICATION_UPDATE:
            return {
                ...state,
                notification:{
                    ...state.notification,

                    status : action.value,
                    title: action.title,
                    color: action.color
                }
            };

        default : return state;    
    }
}

export default rootReducer

