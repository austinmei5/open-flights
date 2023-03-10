import React,  { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Header from './Header'

const Airline = () => {
  const [airline, setAirline] = useState({})
  const [review, setReview] = useState({})

  const { slug } = useParams()

  useEffect(() => {
    //airlines/united-airlines 
    const url = `/api/v1/airlines/${slug}`

    axios.get(url)
    .then( response => setAirline(response.data))
    .catch( response => console.log(response))
  }, [])


  return (
  <div className="wrapper">
    <div className="column">
      <div className="header"></div>
      <div classname="reviews"></div>
    </div>
    <div className="column">
      <div className="review-form">[Review Form Location</div>
    </div>
  </div>)
}


export default Airline
