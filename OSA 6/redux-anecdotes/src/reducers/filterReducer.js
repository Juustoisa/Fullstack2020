const filterAtStart = {
    filter: ''
}


const initialState = filterAtStart

export const setFilter = (value) => {
    return {
        type: "SET_FILTER",
        filter: value
    }
  }


const reducer = (state = initialState, action) => {
    console.log('state now: ', state)
    console.log('action', action)
    switch (action.type) {
        case 'SET_FILTER':
            return {...state, filter: action.filter}
        default:
            return state
    }
}

export default reducer