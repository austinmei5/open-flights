import React from 'react'
import styled from 'styled-components'
import Gray from './Stars/Gray'
import Hover from './Stars/Hover'
import Selected from './Stars/Selected'

const RatingContainer = styled.div`
  text-align: center;
  border-radius: 4px;
  font-size: 18px;
  padding: 20px 0 10px 0;
  border: 1px solid #e6e6e6;
  background: #fff;
  margin-top : -3px;
`

const RatingBox = styled.div`
  background: #fff;
  display: flex;
  justify-content: center;
  flex-direction: row-reverse;
  position: relative;
  margin-top: 12px;
  
  input {
    display: none;
  }

  label {
    cursor: pointer;
    width: 40px;
    height: 40px;
    background-image: url("data:image/svg+xml;charset=UTF-8,${Gray}");
    background-repeat: no-repeat;
    background-position: center;
    background-size: 70%;
  }

  input:checked ~ label,
  input:checked ~ label ~ label {
    background-image: url("data:image/svg+xml;charset=UTF-8,${Selected}");
  }

  input:not(:checked) ~ label:hover,
  input:not(:checked) ~ label:hover ~ label {
    background-image: url("data:image/svg+xml;charset=UTF-8,${Hover}");
  }
`

const Field = styled.div`
  border-radius: 4px;  
  
  input {
    min-height: 30px;
    border-radius: 4px;
    border: 1px solid #e6e6e6;
    padding: 12px;
    width: 96%;
    margin-bottom: 12px;
    font-size: 18px;
    font-family: Arial, Helvetica, sans-serif;
  }

  textarea {
    min-height: 80px;
    border-radius: 4px;
    border: 1px solid #e6e6e6;
    padding: 12px;
    width: 96%;
    resize: none;
    margin-bottom: 12px;
    font-size: 18px;
    font-family: Arial, Helvetica, sans-serif;
  }
`
const Wrapper = styled.div`
  background: #fff;
  padding: 20px;
  background: #800000;
  padding-top: 100px;
  
  height: 100%;
  min-height: 100%;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: hidden;
`
const SubmitButton = styled.button`
  color: #fff;
  background: #333;
  border-radius: 4px;
  padding: 12px;
  font-size: 18px;
  cursor: pointer;
  transition: ease-in-out 0.1s;
  border: 1px solid #000;
  width: 100%;
  margin-top: 20px;

  &:hover {
    background: #fff;
    color: #000;
    border: 1px solid #fff;
  }

`
const Headline = styled.div`
  padding: 20px;
  font-size: 30px;
  font-weight: bold;
  color: #fff;
  margin-left: -18px;
`

const RatingTitle = styled.div`
  font-size: 20px;
  font-weight: bold;
`

const ReviewForm = (props) => {
  const ratingOptions= [5,4,3,2,1].map( (score, index) => (
    <React.Fragment key={score}>
      <input type="radio" value={score} checked={props.review.score == score} name="rating" onChange={() => console.log('selected:', score)} id={`rating-${score}`}/>
      <label onClick={props.setRating.bind(this, score)}></label>
    </React.Fragment>
  ))

  return (
    <Wrapper>
      <form onSubmit={props.handleSubmit}>
        <Headline>Have an experience with {props.attributes.name}? Share your review!</Headline>
        <Field>
          <input type="text" name="title" placeholder="Review Title" onChange={props.handleChange} value={props.review.title||''}/>
        </Field>
        <Field>
          <textarea name="description" placeholder="Review Description" 
          onChange={props.handleChange} value={props.review.description||''} />
        </Field>
        <Field>
          <RatingContainer>
            <RatingTitle>Rate This Airline</RatingTitle>
            <RatingBox>
              {ratingOptions}
            </RatingBox>
          </RatingContainer>
        </Field>

        <SubmitButton type="submit">Submit Your Review</SubmitButton>
      </form>

    </Wrapper>
  )
}

export default ReviewForm
