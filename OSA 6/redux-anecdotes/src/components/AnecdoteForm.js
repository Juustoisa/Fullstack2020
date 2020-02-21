import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNewNotification} from '../reducers/notificationReducer'


const CreateNewForm = (props) => {
   

    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.submitNew.value
        event.target.submitNew.value = ''
        props.createAnecdote(content)
        props.setNewNotification('You posted a new anecdote: "'+content+'".', 5)
    }
    
    return (
            <form onSubmit={addAnecdote}>
                <input name="submitNew" />
                <button type="submit">create</button>
            </form>
    )
}


const mapDispatchToProps = {
    createAnecdote,
    setNewNotification,
  }
  
  const ConnectedCreateNewForm = connect(null, mapDispatchToProps)(CreateNewForm)
  

export default ConnectedCreateNewForm