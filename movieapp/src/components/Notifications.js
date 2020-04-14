import React from 'react';
import './Notifications.css';

import { connect} from 'react-redux';

const Notifications = ({ notification }) => {
    
    return (
        <div className={ `my-notification  ${notification.status ? 'show-my-notification ' : ''} ${notification.color} ` }>
            <span>{ notification.title }</span> <br/>
            <span>{ notification.color === 'add' ? notification.action.add : ( notification.color === 'del' ? notification.action.del : ( notification.color === 'move' ? notification.action.move : notification.action.exist )) }</span>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        notification : state.notification
    }
}

export default connect( mapStateToProps )( Notifications );