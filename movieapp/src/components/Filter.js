
import React, {Component} from 'react';
import './Filter.css';

import { connect } from 'react-redux';
import { btnFilterIsClicked, filterGenres, resetGenresFilter } from '../actions/ActionCreators';


class Filter extends Component {

	render() {
		const { filterBtn, onFilterBtnClick, genres, onFilterGenres, onresetGenresFilter } = this.props;

		const filterList = genres.length ? (
			genres.map( filter => {
				return (
					<p key={ filter } >
						<label onClick={ () =>  onFilterGenres( filter ) }>
							<input className="with-gap" name="group1" type="radio" />
							<span className='genre-text'>{ filter }</span>
						</label>
					</p>
				)
			})
		) : (
			<div className='center genre-no-genre'>No Movie Genres</div>
		)


		return(
            <div className={ 'my-filter ' + ( filterBtn ? 'show-filter' : '' ) }>
				<div className='left-filter'>
                    <button onClick={ () => onFilterBtnClick( filterBtn )} className='btn-floating teal pulse my-filter-btn'>
						<i className='material-icons'>
							{ filterBtn ? 'close' : 'filter_list'}
						</i>
					</button>
                </div>
                <div className='right-filter'>
					<form action="#">
						<p>
							<label onClick={ () => onresetGenresFilter() }>
								<input className="with-gap" name="group1" type="radio" />
								<span className='genre-text'>Reset Genres</span>
							</label>
						</p>
						{ filterList }
					</form>
                </div>
        </div>
            
		)
	}
}


const mapStateToProps = state => {
	return {
		filterBtn: state.filterBtn,
		genres: state.genres,
		filteredData: state.filteredData,
		toWatchData: state.toWatchData
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onFilterBtnClick: click => dispatch(btnFilterIsClicked(click)),
		onFilterGenres: filter => dispatch(filterGenres(filter)),
		onresetGenresFilter: () => dispatch(resetGenresFilter())
	}
}


export default connect( mapStateToProps, mapDispatchToProps )(Filter);