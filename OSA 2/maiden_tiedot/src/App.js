import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Countrylist from './components/Countrylist';

const App = () => {
  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')
  

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  const handleShowChange = (props) => {
    setNewFilter(props)
  }

  let results = countries.filter(value => value.name.toLowerCase().includes(newFilter.toLowerCase()))

  return (
    <div>
      <form>

        find countries: <input
          value={newFilter}
          onChange={handleFilterChange}
        />
      </form>
      
      <Countrylist results={results} handleChange={handleShowChange} />

    </div>)
}

export default App
