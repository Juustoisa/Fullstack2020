const notificationAtStart = {
    notification: null
}


const initialState = notificationAtStart

export const setNewNotification = (message) => {
    return {
        type: "SET_NEW",
        notification: message
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