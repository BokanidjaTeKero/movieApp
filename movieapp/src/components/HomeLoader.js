import React, { Component } from 'react';
import './HomePageLoader.css';


class HomeLoader extends Component {

  

    render(){
    const { homePageLoader } = this.props;
    
    return (
        <div className={ 'home-page-loader ' + ( homePageLoader ? 'show-home-page-loader' : '' ) }>
            <div className='home-page-loader-content'></div>
        </div>
    )
}}


export default HomeLoader;