export function getDate(changeWeek, currentMonday) {
    return (dispatch) => {
        dispatch({
            type: 'CHANGE_WEEK',
            payload: {changeWeek, currentMonday}
        })
    }
}
