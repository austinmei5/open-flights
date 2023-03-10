import React,  { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Header from './Header'
im

const Airline = () => {
  const [airline, setAirline] = useState({})
  const [review, setReview] = useState({})
  const [loaded, setLoaded] = useState(false)

  const { slug } = useParams()

  useEffect(() => {
    //airlines/united-airlines 
    const url = `/api/v1/airlines/${slug}`

    axios.get(url)
    .then( response => {
      setAirline(response.data)
      setLoaded(true)
    })
    .catch( response => console.log(response))
  }, [])


  return (
  <div className="wrapper">
    <div className="column">
      { 
        loaded && 
        <Header 
          attributes={airline.data.attributes}
          reviews={airline.included}
        />
      }
      <div className="reviews"></div>
    </div>
    <div className="column">
      <div className="review-form">[Review Form Location</div>
    </div>
  </div>)
}


export default Airline
