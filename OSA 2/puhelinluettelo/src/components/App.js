import React, { useState, useEffect } from 'react';
import Filter from './Filter';
import NewContact from './NewContact';
import Numbers from './Numbers';
import contactService from '../services/contacts';
import './App.css'
 
 
const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newFilter, setNewFilter] = useState('')
    const [statusMessage, setStatusMessage] = useState(null)
    const [statusType, setStatusType] = useState(null)
    
 
    const Notification = ({ message }) => {
        if (message === null) {
            return null
        }
 
        return (
            <div className={statusType}>
                {message}
            </div>
        )
    }

 
    useEffect(() => {
        contactService
            .getAll()
            .then(response => {
                setPersons(response.data)
 
            })
    }, [])
 
 
    const addName = (event) => {
        event.preventDefault()
        if (persons.find(p => p.name.toLowerCase() === newName.toLowerCase())) {
            let person = persons.find(p => p.name.toLowerCase() === newName.toLowerCase())
            if (window.confirm(`${person.name} is already added to phonebook, replace the old number with a new one?`)) {
                person.number = newNumber
                contactService
                    .update(person.id, person)
                    .then(person => {
                        setPersons(persons.concat(person))
                        setStatusMessage(
                            `${newName} was added to phonebook`
                        )
                        setStatusType('success')
                        setTimeout(() => {
                            setStatusMessage(null)
                        }, 5000)
                    }).catch(error => {
                        setStatusType('error')
                        setStatusMessage(
                            `Unable to update '${newName}' number to phonebook.`
                          )
                          setTimeout(() => {
                            setStatusMessage(null)
                        }, 5000)
                    })
            }
        } else {
            const nameObject = {
                name: newName,
                number: newNumber
            }
            contactService
                .create(nameObject)
                .then(nameObject => {
                    setPersons(persons.concat(nameObject.data))
                    setStatusMessage(
                        `${newName} was added to phonebook`
                    )
                    setStatusType('success')
                    setTimeout(() => {
                        setStatusMessage(null)
                    }, 5000)
                }).catch(error => {
                    setStatusType('error')
                    setStatusMessage(
                        `Unable to add '${newName}' to phonebook.`
                      )
                      setTimeout(() => {
                        setStatusMessage(null)
                    }, 5000)
                })
            
        }
        setNewName('')
        setNewNumber('')
    }
 
    const handleDeleteReq = (props) => {
 
        if (window.confirm(`Are you sure you want to delete ${props.name}?`)) {
            contactService
                .poisto(props.id)
                .then(nameObject => {
                    setPersons(persons.filter(p => p.id !== props.id))
                    setStatusMessage(
                        `${props.name} was removed from phonebook`
                    )
                    setStatusType('success')
                    setTimeout(() => {
                        setStatusMessage(null)
                    }, 5000)
                }).catch(error => {
                    setStatusType('error')
                    setStatusMessage(
                        `Information for '${props.name}' was already removed from phonebook.`
                      )
                      setTimeout(() => {
                        setStatusMessage(null)
                    }, 5000)
                })
               
        }
 
    }
 
    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }
 
    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }
 
    const handleFilterChange = (event) => {
        setNewFilter(event.target.value)
    }
 
    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={statusMessage} />
            <Filter value={newFilter} onChange={handleFilterChange} />
            <h2>Add new contact</h2>
            <NewContact addName={addName} nameValue={newName} onChangeName={handleNameChange} numberValue={newNumber} onChangeNumber={handleNumberChange} />
            <h2>Numbers</h2>
            <Numbers list={persons} newFilter={newFilter} handleDeleteReq={handleDeleteReq} />
        </div>
    )
}
 
export default App