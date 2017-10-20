import {
    UPDATE,
    CHANGE_WEEK
} from '../constants/Calendar'

const initState = {
    week: getMonday(),
    visit : getVisitForWeek(getMonday())
}

export default function caledar(state = initState, action) {
    switch (action.type) {
        case UPDATE : {
            let week = changeMonday(action.payload.changeWeek, action.payload.currentMonday);
            let visit = getVisitForWeek(week);
            return {...state, visit: visit, week: week};
        }
        case CHANGE_WEEK : {
            let week = changeMonday(action.payload.changeWeek, action.payload.currentMonday);
            let visit = getVisitForWeek(week);
            return {...state, visit: visit, week: week};
        }
        default :
            return state;
    }
}

function getMonday() {
    let date = new Date();
    while (date.getDay() !== 1) {
        date = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1);
    }
    localStorage.setItem('monday', JSON.stringify(date));
    return date;
}

function changeMonday(change, date) {
    let monday;
    if (change === 'next') {
        console.log(' cal comp next');
        monday = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 7);
    } else {
        console.log(' cal comp prev');
        monday = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 7);
    }
    console.log('changeMonday return - ' + monday);
    return monday;
}


function getVisitForWeek(monday) {
    console.log('getVisitForWeek - ' + monday);
    let beginDateString = monday.toISOString();
    let sunday = new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + 6);
    let endDateString = sunday.toISOString();
    console.log('https://si-visit.herokuapp.com/api/visits/week?start-time=' + beginDateString + '&end-time=' + endDateString);
    let myRequest = new Request('https://si-visit.herokuapp.com/api/visits/week?start-time=' + beginDateString + '&end-time=' + endDateString);
    fetch(myRequest)
        .then(function (response) {
            if (response.status === 200) return response.json();
            else throw new Error('Something went wrong on api server!');
        })
        .then(function (response) {
            let dataArr= [];
                response.forEach(value => {
                let date = new Date(value.startTime);
                dataArr[date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate()] = value;
            });
            console.log('IN getVIsitForWeek - ' + dataArr);
            return dataArr;
        })
        .catch(function (error) {
            console.error(error);
        });
}