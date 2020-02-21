const initialState = {
  good: 0,
  ok: 0,
  bad: 0,
  reviews: 0,
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  let newState = {...state, reviews: state.reviews +1}
  switch (action.type) {
    case 'GOOD':
      return {...newState, good: newState.good+1 }
    case 'OK':
      return {...newState, ok: newState.ok+1 }
    case 'BAD':
      return {...newState, bad: newState.bad+1 }
    case 'ZERO':
      return {...newState, good:0, ok:0, bad:0, reviews:0}
    default: return state
  }
}

export default counterReducer