import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  padding: 50px 100px 50px 0;

  img {
    height: 50px;
    width: 50px;
    border-radius: 100%;
    border: 1px solid rbga(0,0,0,0.1);
  }

  h1 {
    font-size: 30px;
  }
`
const TotalReviews = styled.div`
  font-size: 18px;
  padding: 10px 0;
`
const TotalOutOf = styled.div`
  font-size: 18px;
  padding: 10px 0;
  font-weight: bold;
`

const Header = (props) => {
  const {name, image_url, avg_score} = props.attributes
  const total = props.reviews.length

  return (
    <Wrapper>
      <h1> <img src={image_url} alt={name}/>{name}</h1>
      <div>
        <TotalReviews>{total} User Reviews</TotalReviews>
        <div className="starRating"></div>
        <div className="totalOutOf">{avg_score} out of 5</div>
      </div>
    </Wrapper>
  )
}

export default Header
