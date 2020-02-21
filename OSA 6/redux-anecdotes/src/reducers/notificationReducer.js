const notificationAtStart = {
    notification: null
}

const initialState = notificationAtStart
let timeoutIdentifier = null

export const setNewNotification = (message, timer) => {
    return async dispatch => {
        clearTimeout()
        await dispatch ({
            type: "SET_NEW",
            notification: message
        })
        if(timeoutIdentifier){
            clearTimeout(timeoutIdentifier)
        }
        timeoutIdentifier = setTimeout(() => dispatch ({
            type: "HIDE_NOTIFICATION"
        }), timer * 1000)
    }
  }


const reducer = (state = initialState, action) => {
    console.log('state now: ', state)
    console.log('action', action)
    switch (action.type) {
        case 'SET_NEW':
            return {...state, notification: action.notification}
        case 'HIDE_NOTIFICATION':
            return {...state, notification: null}
        default:
            return state
    }
}

export default reducer