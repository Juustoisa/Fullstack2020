import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Button = ({ onClick, text}) => (
    <button onClick={onClick}>
        {text}
    </button>
)

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(6).fill(0))

  const handleNextClick = () => {
    setSelected(Math.floor(Math.random() * 6))
}

const handleVoteClick = () => {
    let copy = [...votes]
    copy[selected] ++
    setVotes(copy)
}

  return (
    <div>
    <h2>Anecdote of the day</h2>
      {props.anecdotes[selected]}<br></br>This anecdote has {votes[selected]} votes.
      <br></br>
      <Button onClick={handleVoteClick} text='vote' />
      <Button onClick={handleNextClick} text='next anecdote' />
      <h2>Anecdote with the most votes</h2>
      {props.anecdotes[votes.indexOf(Math.max(...votes))]}<br></br>This anecdote has {votes[votes.indexOf(Math.max(...votes))]} votes.
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)