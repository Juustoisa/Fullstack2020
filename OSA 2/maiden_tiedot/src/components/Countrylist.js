import React, { useState, useEffect } from 'react';
import axios from 'axios';


const Countrylist = ({ results, handleChange }) => {
    console.log(results)
    const [weather, setWeather] = useState([])

    useEffect(() => {
        console.log('effect')
        axios
          .get('https://api.openweathermap.org/data/2.5/weather?q=London')
          .then(response => {
            console.log('promise fulfilled')
            setWeather(response.data)
          })
      }, [])


    if (results.length > 10 || results.length < 1) {
        return (
            <div>
                <p> Too many matches or no matches, specify another filter</p>
            </div>
        )
    } else {

        if (results.length > 1) {
            return (
                <div>
                    {results.map((value) =>

                        <p key={value.name}>{value.name} <button onClick={() => handleChange(value.name)}>show </button> </p>)}

                </div>
            )
        } else {
            console.log(results[0])
            return (
                <div>

                    <h2>{results[0].name}</h2>
                    <p>capital {results[0].capital}</p>
                    <p>population {results[0].population}</p>
                    <h3>Spoken languages</h3>
                    <ul>
                        {results[0].languages.map((value) =>
                            <li key={value.name}>{value.name}</li>)}
                    </ul>
                    <img src={results[0].flag} alt="Flag of the country" width="300"></img>
                    <h3>Weather in {results[0].name}</h3>

                    <p>{weather.main}</p>
                </div>
            )
        }

    }
}

export default Countrylist