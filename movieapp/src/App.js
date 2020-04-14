import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import HomeLoader from './components/HomeLoader';
import Navbar from './components/Navbar';
import Search from './components/Search';
import Filter from './components/Filter';
import MovieList from './components/MovieList';
import MoviePage from './components/MoviePage';
import Loader from './components/Loader';
import Notifications from './components/Notifications';


import { connect} from 'react-redux';
import { 
  activeHomePageLoader,
  getDataFromFirebase,
  updateToWatchMoviesData,
  updateWatchedMoviesData,
  moveMovieUpOrDown,
  showMovie  
 } from './actions/ActionCreators';


class App extends Component {

  componentDidMount() {
    this.props.onHomeLoad();
    this.props.onMovieUpdate();
    const urlNeeded = window.location.pathname.slice(1);

    if( window.location.pathname !== '/' ) {
      this.props.onShowMovie(urlNeeded) 
    }
 }

  render() {
    const { homePageLoader, watchedData, filteredData, loader, upOrDown, pageID, showPage } = this.props;

    return (
      <BrowserRouter>
        <div className='App'>
          <HomeLoader homePageLoader={ homePageLoader } />
          <Navbar />
          <Search />
          <Loader loader={ loader } />
          <Notifications />
          <Route exact path='/'>
          <Filter />
              <div className='telo'>
                <div className='sadrzaj'>
                  <MovieList 
                    movies={ filteredData }
                    movieGroup={ 'Movies To Watch' }
                    upOrDown={ ( e, k ) => upOrDown( e, k ) }
                    otherControls={ true }
                  />
                  <MovieList 
                    movies={ watchedData }
                    movieGroup={ 'Watched Movies' }
                    otherControls={ false }
                  />
                </div>
              </div>
          </Route>
          <Route path={`/${pageID}`} >
            { showPage &&
              <MoviePage/>
            }
          </Route>
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return {
    allMoviesData: state.allMoviesData,
    watchedData: state.watchedData,
    toWatchedData: state.toWatchedData,
    filteredData: state.filteredData,
    loader: state.loader,
    genres: state.genres,
    pageID: state.pageID,
    showPage: state.showPage,
    homePageLoader: state.homePageLoader
  }
}

const mapDispatchToProps = dispatch => {
 return {
     onMovieUpdate: () => dispatch(getDataFromFirebase()),
     toWatchMoviesData: () => dispatch(updateToWatchMoviesData()),
     watchedMoviesData: () => dispatch(updateWatchedMoviesData()),
     upOrDown: (movie, status) => dispatch(moveMovieUpOrDown(movie, status)),
     onShowMovie: movie => dispatch(showMovie(movie)),
     onHomeLoad: () => dispatch(activeHomePageLoader())    
 }
}

export default connect( mapStateToProps, mapDispatchToProps )( App );