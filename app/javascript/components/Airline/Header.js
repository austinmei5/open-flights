import React from 'react'
import styled from 'styled-components'
import Rating from '../Rating/Rating'
import { BrowserRouter, Link } from 'react-router-dom'


const Wrapper = styled.div`
  padding: 0 100px 25px 0;
  font-size: 28px;

  img {
    height: 60px;
    width: 60px;
    border-radius: 100%;
    border: 1px solid rbga(0,0,0,0.1);
    margin-bottom: -8px;
  }
`
const LinkWrapper = styled.div`
  cursor: pointer;
  transition: ease-in-out 0.1s;
  margin-top: 30px;

  a {
    color: #5A5A5A;
    background: #D3D3D3;
    border-radius: 4px;
    padding: 10px 10px;
    border: 1px solid #5A5A5A;
    text-decoration: none;

    &:hover {
      background: #fff;
      color: #000;
      border: 1px solid #D3D3D3;
    }
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
  // console.log(avg_score)
  const total = props.reviews.length

  return (
    <>
  
    <LinkWrapper>
      <Link to={`/`}>Return Home</Link>
    </LinkWrapper>
    <Wrapper>
      <h1> <img src={image_url} alt={name}/> {name}</h1>
      <div>
        <TotalReviews>{total} User Reviews</TotalReviews>
        <Rating score={avg_score} />
        <TotalOutOf>{avg_score} out of 5 stars</TotalOutOf>
      </div>
    </Wrapper>
    </>
  )
}

export default Header
