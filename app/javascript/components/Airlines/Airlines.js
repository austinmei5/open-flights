import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Airline from './Airline'
  
const Airlines = () => {
  const [airlines, setAirlines] = useState([])

  useEffect(() => {
    axios.get('/api/v1/airlines.json')
    .then( response => {
      setAirlines(response.data.data)
    })
    .catch( response => console.log(response))

  }, [airlines.length])

  const grid = airlines.map( item => {
    return (
      <Airline key={item.attributes.name} attributes={item.attributes} />
    )
  })


  return (
    <div className="home">
      <div className="header">
        <h1>OpenFlights</h1>
        <div className="subheader">Honest, unbiased airline reviews.</div>
      </div>
      <div className="grid">
        <ul>{list}</ul>
      </div>
    </div>
  )
}


export default Airlines
