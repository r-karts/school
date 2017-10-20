import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import User from '../components/User'
import Page from '../components/Page'
import Calendar from '../components/Calendar'
import * as pageActions from '../actions/PageActions'
import * as userActions from '../actions/UserActions'
import * as calendarActions from '../actions/CalendarActions'



class App extends Component {
    render() {
        const {user, page, calendar} = this.props;
        const {getPhotos} = this.props.pageActions;
        const {handleLogin} = this.props.userActions;
        const {getDate} = this.props.calendarActions;
        return <div className='row'>
            <Page photos={page.photos} year={page.year} getPhotos={getPhotos} fetching={page.fetching}/>
            <User name={user.name} handleLogin={handleLogin} error={user.error}/>
            <Calendar week={calendar.week} getDate={getDate} visit={calendar.visit} />
        </div>
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
        page: state.page,
        calendar: state.calendar
    }
}

function mapDispatchToProps(dispatch) {
    return {
        pageActions: bindActionCreators(pageActions, dispatch),
        userActions: bindActionCreators(userActions, dispatch),
        calendarActions: bindActionCreators(calendarActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)