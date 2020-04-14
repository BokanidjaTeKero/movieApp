import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

import { connect} from 'react-redux';

const Navbar = ( { watchedData, toWatchedData } ) => {
    
    return (
        <nav className='nav-wrapper teal'>
            <div className='container'>
                <Link to='/' className='brand-logo logo'></Link>
                <div className='brand-logo right'>
                    <div className='movies-number'>
                        <i className="material-icons">visibility</i><span>{ toWatchedData.length }</span>
                    </div>
                    <div className='movies-number'>
                        <i className="material-icons">visibility_off</i><span>{ watchedData.length }</span>
                    </div>
                </div>
            </div>
        </nav>
    )
}

const mapStateToProps = state => {
    return {
      watchedData: state.watchedData,
      toWatchedData: state.toWatchedData,
    }
  }

export default connect( mapStateToProps, null )( Navbar );