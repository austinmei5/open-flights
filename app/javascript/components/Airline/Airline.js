import React,  { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Header from './Header'
import styled from 'styled-components'
import ReviewForm from './ReviewForm'

const Wrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`
const Column = styled.div`
  background: #fff;
  height: 100vh;
  overflow: scroll;

  &:last-child {
    background: #000;
  }
`
const Main = styled.div`
  padding-left: 50px;
`
// const Wrapper = styled.div``
// const Wrapper = styled.div``

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

  const handleChange = (event) => {
    event.preventDefault()

    setReview(Object.assign(...review, {[event.target.name]: event.target.value}))

    // console.log('review:', review)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const csrfToken = document.querySelector('[name=csrf-token]').content
    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken

    const airline_id = airline.data.id

    axios.post('/api/v1/reviews', {review, airline_id})
    .then(response => {
      const included = [...airline.included, response.data]
      setAirline({...airline, included})
      setReview({title: '', description: '', score: 0})
    })
    .catch(response => {})
  }


  return (
  <Wrapper>
    { 
      loaded && 
      <>
        <Column>
          <Main>
              <Header 
                attributes={airline.data.attributes}
                reviews={airline.included}
              />
            <div className="reviews"></div>
          </Main>
        </Column>
        <Column>
          <ReviewForm 
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            attributes={airline.data.attributes}
            review={review}
          />
        </Column>
      </>
    }
  </Wrapper>
  )
}


export default Airline
