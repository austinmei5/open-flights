import React,  { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Header from './Header'
import styled from 'styled-components'

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


  return (
  <Wrapper>
    <Column>
      <Main>
        { 
          loaded && 
          <Header 
            attributes={airline.data.attributes}
            reviews={airline.included}
          />
        }
        <div className="reviews"></div>
      </Main>
    </Column>
    <Column>
      <div className="review-form">[Review Form Location</div>
    </Column>
  </Wrapper>)
}


export default Airline
