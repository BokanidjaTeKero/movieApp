import React, { Component } from 'react';
import './NextPageLoader.css';


class NextPageLoader extends Component {

    render(){
    const { nextPageLoader } = this.props;
    
    return (
        <div className={ 'next-page-loader ' + ( nextPageLoader ? 'show-next-page-loader' : '' ) }>
            <div className='next-page-loader-content'></div>
        </div>
    )
}}

export default NextPageLoader;