import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import './MovieList.css';

import { connect} from 'react-redux';
import { 
    deleteMovieFromTheData, 
    addingMovieToToWatchedData,
    showMovie
    } from '../actions/ActionCreators';

class MovieList extends Component {


	render() {
        const { movies, 
            otherControls, 
            deleteMovie, 
            addToToWached, 
            upOrDown, 
            onShowMovie, 
            movieGroup 
        } = this.props;
        
        const moviesList = movies.length ? (
            movies.map( movie => {
                return (
                    <div className="col s12 m12 movie-item" key={ movie.imdbID }>
                        <div className="card blue-grey darken-1 movie-card">
                            <div className="card-content">
                            <span className="card-title imdb-rating">{ movie.imdbRating }</span>

                            <Link to={`/${movie['imdbID']}`}>
                                <span onClick={ () => { onShowMovie( movie['imdbID'] ) } } className="card-title">{ movie.Title }</span>
                            </Link>
                            
                            <p>{ movie.Genre }</p>
                            </div>
                            <div className="card-action card-controls">
                                <button onClick={ () => deleteMovie( movie ) } className=" btn-small waves-effect waves-light red btn-btn">
                                    <i className="material-icons btn-icon">delete_forever</i>
                                </button>
                                { otherControls && 
                                    <div className='additional-controls'>
                                        <button onClick={ () => addToToWached( movie, movies ) } className=" btn-small waves-effect waves-light green btn-btn">
                                            <i className="material-icons btn-icon">visibility_off</i>
                                        </button>
                                        <div>
                                            <button onClick={ () => upOrDown(movie, false) } className=" btn-small waves-effect waves-light blue btn-btn">
                                                <i className="material-icons btn-icon">arrow_drop_up</i>
                                            </button>
                                            <button onClick={ () => upOrDown(movie, true) } className=" btn-small waves-effect waves-light blue btn-btn">
                                                <i className="material-icons btn-icon">arrow_drop_down</i>
                                            </button>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                )
            })
        ) : (
            <div className='center movie-list-no-movie'>No Movies</div>
        )
		return(
			<div className='container movie-list-container row'>
                <h2 className='center movie-list-title'>{ movieGroup }</h2>
                { moviesList } 
            </div>
		)
	}
} 


const mapDispatchToProps = dispatch => {
    return {
        deleteMovie: (movie) => dispatch(deleteMovieFromTheData(movie)),
        addToToWached: (movie,movies) => dispatch(addingMovieToToWatchedData(movie,movies)),
        onShowMovie: movie => dispatch(showMovie(movie))
    }
}

export default connect( null, mapDispatchToProps )( MovieList ); 