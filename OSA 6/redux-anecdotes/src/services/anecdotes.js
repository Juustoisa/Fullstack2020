import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const anecdoteObject = {content, votes: 0}
  const response = await axios.post(baseUrl, anecdoteObject)
  return response.data
}

const giveVote = async (id) => {
  const targetAnecdote = await axios.get(baseUrl+'/'+id)

  const updatedAnecdote = {
    content: targetAnecdote.data.content,
    id: targetAnecdote.data.id,
    votes: targetAnecdote.data.votes +1,
  }
  console.log(updatedAnecdote)
  const response = await axios.put(baseUrl+'/'+id, updatedAnecdote)
  return response.data
}

export default { getAll, createNew, giveVote }