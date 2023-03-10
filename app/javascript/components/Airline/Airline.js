import React,  { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Header from './Header'
import styled from 'styled-components'
import ReviewForm from './ReviewForm'
import Review from './Review'
// import SuccessAlert from '../Alerts/Success'
// import Alert from 'react-bootstrap/Alert';

const Wrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  font-family: Arial, Helvetica, sans-serif;

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

const Airline = () => {
  const [airline, setAirline] = useState({})
  const [review, setReview] = useState({})
  const [loaded, setLoaded] = useState(false)
  const [avgScore, setAvgScore] = useState(0)

  function AverageScoreCalculator(reviewsArray) {
    if (reviewsArray.length === 0){
      return 0
    }

    const sumScores = reviewsArray.map(item => item.attributes.score).reduce((prev, next) => prev + next);
    const numScores = reviewsArray.length
    const avgScore = (Math.round(sumScores/numScores * 100)/100)
    return avgScore
  }

  // console.log(airline.included)

  const { slug } = useParams()

  useEffect(() => {
    //airlines/united-airlines 
    const url = `/api/v1/airlines/${slug}`

    axios.get(url)
    .then( response => {
      setAirline(response.data)
      setLoaded(true)
      const tempScore = AverageScoreCalculator(response.data.included)
      setAvgScore(tempScore)

      
    })
    .catch( response => console.log(response))
  }, [])

  const handleChange = (event) => {
    event.preventDefault()

    setReview(Object.assign({...review, [event.target.name]: event.target.value}))

    // console.log('review:', review)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const csrfToken = document.querySelector('[name=csrf-token]').content
    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken

    const airline_id = airline.data.id

    axios.post('/api/v1/reviews', {review, airline_id})
    .then(response => {
      const included = [...airline.included, response.data.data]
      //console.log(included)
      setAirline({...airline, included})
      setReview({title: '', description: '', score: 0})

      const newAvgScore = AverageScoreCalculator(included)
      setAvgScore(newAvgScore)
    })
    .catch(response => {})
  }

  const setRating = (score, event) => {
    event.preventDefault()

    setReview({...review, score})
  }

  let reviews

  if (loaded && airline.included) {
    reviews = airline.included.map( (item, index) => {
      // console.log('mapping', item)
      return (
        <Review
          key={index}
          attributes={item.attributes}
        />
      )
    })
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
                score={avgScore}
                reviews={airline.included}
              />
            {reviews}
          </Main>
        </Column>
        <Column>
          <ReviewForm 
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            setRating={setRating}
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
