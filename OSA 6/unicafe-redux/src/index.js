import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
  const good = () => {
    store.dispatch({
      type: 'GOOD'
    })
  }

  const neutral = () => {
    store.dispatch({
      type: 'OK'
    })
  }

  const bad = () => {
    store.dispatch({
      type: 'BAD'
    })
  }

  const reset = () => {
    store.dispatch({
      type: 'ZERO'
    })
  }

  const buttonBoard = () => {
    return (
      <div>
        <button onClick={good}>hyvä</button>
        <button onClick={neutral}>neutraali</button>
        <button onClick={bad}>huono</button>
        <button onClick={reset}>nollaa tilastot</button>
      </div>
    )
  }

  const statisticsTable = () => {
    if (store.getState().reviews === 0) {
      return (
        <div>No reviews yet</div>
      )
    } else {
      return(
      <table>
        <tbody>
          <div>Good: {store.getState().good}</div>
          <div>Ok: {store.getState().ok}</div>
          <div>Bad: {store.getState().bad}</div>
          <div>Total: {store.getState().reviews}</div>
          <div>Average: {((store.getState().good * 1) + (store.getState().bad * -1)) / store.getState().reviews}</div>
          <div>Positive reviews {(store.getState().good / store.getState().reviews) * 100 + '%'} </div>
        </tbody>
      </table>
      )}
  }

  return (
    <div>
    {buttonBoard()}
    {statisticsTable()}
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)