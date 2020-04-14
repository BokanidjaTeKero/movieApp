import React, { Component } from 'react'
import './MoviePage.css';
import NextPageLoader from './NextPageLoader';

import { connect } from 'react-redux';
import { 
    activeNextPageLoader,
   } from '../actions/ActionCreators';


class MoviePage extends Component {

    componentDidMount() {
        this.props.loaderActive();
    }

    render(){
        const { movieDetails, nextPageLoader } = this.props;
        return (
            <div className='container movie-page-container'>
                <NextPageLoader nextPageLoader={ nextPageLoader }  />
                <div className='movie-img-and-baseData '>
                    <div className='col s12 m6 poster-image'>
                        <img src={ movieDetails.Poster } alt={`${movieDetails.Title}-img`} />
                    </div>
                    <div className='movie-baseData col s12 m6'>
                        <h1>{ movieDetails.Title }</h1>
                        <span className='tooltip'>
                            <span className="tooltiptext">Released date</span>
                            <div className='icon released'></div>
                            { movieDetails.Released }
                        </span>
                        <span className='tooltip'>
                            <span className="tooltiptext">Genres</span>
                            <div className='icon genre'></div>
                            { movieDetails.Genre }
                        </span>
                        <span className='tooltip'>
                            <span className="tooltiptext">Runtime</span>
                            <div className='icon runtime'></div>
                            { movieDetails.Runtime }
                        </span>
                        <span className='tooltip'>
                            <span className="tooltiptext">Imdb rating</span>
                            <div className='icon imdbRating'></div>
                            { movieDetails.imdbRating }
                        </span>
                        <span className='tooltip'>
                            <span className="tooltiptext">Movie awards</span>
                            <div className='icon awards'></div>
                            { movieDetails.Awards }
                        </span>
                    </div>
                </div>
 
                <div className='about-movie-people '>
                    <div className='about-movie col s12 m6'>
                        <span className='tooltip'>
                            <span className="tooltiptext">Movie story</span>
                            <div className='icon plot'></div>
                            { movieDetails.Plot }
                        </span>
                        <span className='tooltip'>
                            <span className="tooltiptext">Language</span>
                            <div className='icon language'></div>
                            { movieDetails.Language }
                        </span>
                        <span className='tooltip'>
                            <span className="tooltiptext">Country</span>
                            <div className='icon country'></div>
                            { movieDetails.Country }
                        </span>
                        <span className='tooltip'>
                            <span className="tooltiptext">Expends</span>
                            <div className='icon boxOffice'></div>
                            { movieDetails.BoxOffice }
                        </span>
                    </div>
                    <div className='movei-people col s12 m6'>
                        <span className='tooltip'>
                            <span className="tooltiptext">Director</span>
                            <div className='icon director'></div>
                            { movieDetails.Director }
                        </span>
                        <span className='tooltip'>
                            <span className="tooltiptext">Actors</span>
                            <div className='icon actors'></div>
                            { movieDetails.Actors }
                        </span>
                        <span className='tooltip'>
                            <span className="tooltiptext">Writer</span>
                            <div className='icon writer'></div>
                            { movieDetails.Writer }
                        </span>
                        <span className='tooltip'>
                            <span className="tooltiptext">Production</span>
                            <div className='icon production'></div>
                            { movieDetails.Production }
                        </span>
                    </div>
                </div>
            </div>
        )
    }

    }

    
   

const mapStateToProps = state => {
	return {
        movieDetails: state.movieDetails,
        nextPageLoader: state.nextPageLoader,
	}
}

const mapDispatchToProps = dispatch => {
    return {
        loaderActive: () => dispatch(activeNextPageLoader())
    }
}

export default connect( mapStateToProps, mapDispatchToProps )(MoviePage);
