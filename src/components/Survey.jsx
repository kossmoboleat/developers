import React, { Component } from 'react'
import styled from 'styled-components'

import { medium } from '../layouts/grid'

class DevSurvey extends Component {

  constructor() {
    super()
    this.state = {
      choice: null,
      feedbackStatus: 0, // 0: noop | -1: negative | 1: positive | 2: submitted
      feedback: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    const { choice } = this.state
    const eventName = `content-survey-${choice !== null ? 'updated' : 'taken'}`
    switch(event.target.value){
      case 'true':
        this.setState({
          choice: true,
          feedbackStatus: 1,
        }, () => {
          window.analytics.track(
            eventName,
            { choice },
            {context: { ip: '0.0.0.0' }}
          )
        })
        break;
      case 'false':
        this.setState({
          choice: false,
          feedbackStatus: -1,
          feedback: ''
        }, () => {
          window.analytics.track(
            eventName,
            { choice },
            {context: { ip: '0.0.0.0' }}
          )
        })
        break
      default:
        this.setState({choice: null})
    }
  }

  changeFeedback = ev => {
    this.setState({
      feedback: ev.target.value
    })
  }

  sendFeedback = ev => {
    ev.preventDefault();
    const { feedback, feedbackStatus } = this.state
    window.analytics.track(
      'content-survey-feedback',
      {
        type: feedbackStatus === -1 ? 'negative' : 'positive',
        value: feedback
      },
      { context: { ip: '0.0.0.0' } }
    )
    this.setState({
      feedback: '',
      feedbackStatus: 2
    })
  }

  render() {
    const { feedbackStatus, feedback } = this.state
    return(
      <SurveyContainer>
        <Form>
          <HR />
          <Row>
            <H5>Was this article helpful?</H5>
            <Column>
              <Label>
                <Input type='radio' value='true' name='survey' onChange={this.handleChange} />
                Yes
              </Label>
            </Column>
            <Column>
              <Label>
                <Input type='radio' value='false' name='survey' onChange={this.handleChange} />
                No
              </Label>
            </Column>
          </Row>
          <Feedback show={feedbackStatus !== 0}>
            {feedbackStatus === -1
              ? <React.Fragment>
                <p>We’re sorry to hear that. Help us make uPort documenation better.</p>
                <label for='surveyFeedback'>Tell us how we can improve this article?</label>
                <textarea id='surveyFeedback' onChange={this.changeFeedback} value={feedback} />
                <div className='button-container'>
                  <button type='button' disabled={!feedback} onClick={this.sendFeedback}>
                    Send
                  </button>
                </div>
              </React.Fragment>
              : null}
            {feedbackStatus === 1
              ? <React.Fragment>
                <label>Happy we could help!</label>
                <p>
                  If you have any additional questions or comments, feel free
                  to contact us {' '}
                  <a href='https://uport.zendesk.com/hc/en-us' target='_blank'>here</a>.
                </p>
              </React.Fragment>
              : null}
            {feedbackStatus === 2
              ? <React.Fragment>
                <label>Your feedback has been submitted.</label>
                <p>
                  Thank you for helping us making uPort documenation better.
                  If you have any additional questions or comments, feel free
                  to contact us {' '}
                  <a href='https://uport.zendesk.com/hc/en-us' target='_blank'>here</a>.
                </p>
              </React.Fragment>
              : null}
          </Feedback>
        </Form>
      </SurveyContainer>
    )
  }
}

export default DevSurvey

const Form = styled.form`
  width: 100%;
`

const HR = styled.hr`
  background-color: rgb(229, 229, 229);
  height: 1px;
`

const H5 = styled.h5`
  margin-bottom: 10px;
  @media (min-width: 768px) {
    margin: auto;
  }
  padding-right: 10px;
`

const Input = styled.input`
  margin: 0 10px 0 0;
  padding-left: 5px;
`

const Label = styled.label`
  font-weight: normal;
  margin: auto;
  padding: 10px;
  text-transform: none;
  @media (min-width: 768px) {
    padding: 0 5px;
  }
`

const Row = styled.div`
  @media (min-width: 768px) {
    display: flex;
    flex-direction: row;
  }
  max-width: 25rem;
`

const Column = styled.div`
  margin: auto;
`

const SurveyContainer = styled.div`
  padding-bottom: 20px;
  padding-top: 20px;
  display: flex;
  margin: auto;
`

const Feedback = styled.section`
  background: #F5F5F6;
  border-radius: 4px;
  margin-top: 20px;
  overflow: hidden;
  padding: 20px 40px;
  transition: height 0.2s, visibility 0.2s, opacity 0.2s;

  ${props => props.show
    ? `
      height: auto;
      opacity: 1;
      visibility: visible;
    ` : `
      height: 0;
      opacity: 0;
      visibility: hidden;
    `}
  a {
    font-weight: 600;
    text-decoration: none;
  }
  p {
    color: #5F5D68;
    font-size: 1rem;
    margin-bottom: 5px;
  }
  label {
    color: #5F5D68;
    font-size: 1rem;
    margin-bottom: 10px;
    text-transform: none;
  }
  textarea {
    border: 1px solid #E5E5E5;
    border-radius: 5px;
    box-sizing: border-box;
    box-shadow: inset 0px 0px 4px rgba(134, 134, 134, 0.25);
    font-size: 1rem;
    height: 7rem;
    margin-bottom: 6px;
    width: 100%;
  }
  .button-container {
    text-align: right;
  }
  button {
    background: linear-gradient(60.32deg, #5C50CA 0%, #7958D8 100%);
    border-radius: 4px;
    color: #fff;
    font-weight: 600;
    padding: 6px 20px;
    text-transform: none;
    width: 100%;
    ${medium("width: auto;")}
  }
`
