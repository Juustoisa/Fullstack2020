import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNewNotification} from '../reducers/notificationReducer'


const CreateNewForm = (props) => {
    const dispatch = useDispatch()

    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.submitNew.value
        event.target.submitNew.value = ''
        dispatch(createAnecdote(content))
        dispatch(setNewNotification('You posted a new anecdote: "'+content+'".', 5))
    }
    
    return (
            <form onSubmit={addAnecdote}>
                <input name="submitNew" />
                <button type="submit">create</button>
            </form>
    )
}
export default CreateNewForm