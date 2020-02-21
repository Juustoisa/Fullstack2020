import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createVote } from '../reducers/anecdoteReducer'
import { setNewNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const aFilter = useSelector(state => state.filter.filter)
    let anecdotes = useSelector(state => state.anecdotes).filter(function (anecdote) {
        return String(anecdote.content).includes(aFilter)
    }).sort(function (a, b) {
        return b.votes - a.votes
    })

    const dispatch = useDispatch()

    const vote = (anecdote) => {
        dispatch(createVote(anecdote.id))
        dispatch(setNewNotification('You voted for "' + anecdote.content + '".'))
        setTimeout(() => {
            dispatch({ type: 'HIDE_NOTIFICATION' })
        }, 5000)
    }
    return (
        <div>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList