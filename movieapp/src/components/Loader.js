import React, { Component } from 'react';
import './Loader.css';

import { connect } from 'react-redux';


class Loader extends Component {
    render(){
    const { loader } = this.props;
    
    return (
        <div className={ 'loader ' + ( loader ? 'show-loader' : '' ) }>
            <div className='loader-content'></div>
        </div>
    )
}}

const mapStateToProps = state => {
	return {
		loader: state.loader,
	}
}


export default connect( mapStateToProps )(Loader);