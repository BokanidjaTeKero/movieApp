
import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import './Search.css';

import { connect} from 'react-redux';
import { btnSearchIsClicked, showMovie, searchFetch, addMovie } from '../actions/ActionCreators';


class Search extends Component {

	render() {
        const { searchBtn, 
            onShowMovie, 
            onSearchBtnClick, 
            searchData, 
            data, 
            typing, 
            select 
        } = this.props;

        const movieList = data.length ? (
        data.map( movie  => {
            return (
                <div className='card ' key={ movie.imdbID }>
                    <div className='search-card blue-grey darken-1'>
                        <img className=' search-img' src={ movie.Poster } alt={ movie.Title } />
                        <Link to={`/${movie['imdbID']}`} className="center truncate search-movie-title">
                            <span onClick={ () => { onShowMovie( movie['imdbID'] ) } } className="center truncate search-movie-title">{ movie.Title }</span>
                        </Link>
                        <button onClick={ () => { select( movie ) } }  className='add-movie-btn waves-effect green waves-light btn-small'>
                            <i className='material-icons white-text '>
                                playlist_add
                            </i>
                        </button>
                    </div>
                </div>
            )
        })) : (
            <div className='center'>Type Some Text</div>
        )
		return(
            <div className={ 'my-search ' + ( searchBtn ? 'show-search' : '' ) }>
                <div className='left' >
                    <input onChange={ (e) => searchData(e) } className='search-input' id="search" type="search" placeholder='search term' autoComplete='off' />
                    { typing &&    
                        <div className='search-listed-items'>
                            { movieList }
                        </div>
                    } 
                </div>
                <div className='right'>
                    <button onClick={ () => onSearchBtnClick( searchBtn ) } className='btn-floating teal pulse my-search-btn'>
                        <i className='material-icons'>
                            { searchBtn ? 'close' : 'search'}
                        </i>
                    </button>
                </div>
            </div>
		)
	}
}


const mapStateToProps = state => {
    return {
        searchBtn: state.searchBtn,
        data: state.searchData,
        typing: state.typing,
        string: state.string
    }
}
  
const mapDispatchToProps = dispatch => {
   return {
       onSearchBtnClick: click => dispatch(btnSearchIsClicked(click)),
       searchData: word => dispatch(searchFetch(word)),
       select: movie => dispatch(addMovie(movie)),
       onShowMovie: movie => dispatch(showMovie(movie))
   }
}

export default connect( mapStateToProps, mapDispatchToProps )( Search );