import React from 'react'
import styled from 'styled-components'
import Rating from '../Rating/Rating'

const Wrapper = styled.div`
  padding: 25px 100px 25px 0;
  font-size: 28px;

  img {
    height: 60px;
    width: 60px;
    border-radius: 100%;
    border: 1px solid rbga(0,0,0,0.1);
    margin-bottom: -8px;
  }
`
const TotalReviews = styled.div`
  font-size: 18px;
  padding: 10px 0;
  margin-left: 5px;
`
const TotalOutOf = styled.div`
  font-size: 18px;
  padding: 10px 0;
  font-weight: bold;
  margin-left: 5px;
`

const Header = (props) => {
  const {name, image_url} = props.attributes
  const avg_score = props.score
  const total = props.reviews.length

  return (
    <Wrapper>
      <h1> <img src={image_url} alt={name}/> {name}</h1>
      <div>
        <TotalReviews>{total} User Reviews</TotalReviews>
        <Rating score={avg_score} />
        <TotalOutOf>{avg_score} out of 5 stars</TotalOutOf>
      </div>
    </Wrapper>
  )
}

export default Header
