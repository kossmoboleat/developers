import React, { Component } from 'react'
import styled from 'styled-components'
import CancelModal from '../CancelModal'
import Footer from '../Footer'
import { Container, Grid, Col, Spacer } from '../../../../layouts/grid'

class Review extends Component {
  constructor (props) {
    super(props)
    this.state = {
      cancelModal: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit (e) {
    if (e) e.preventDefault
    const { selectClaims, serviceDetails, appUrl, appDetails } = this.props
    const graphQLendpoint = 'https://em0tmjcepc.execute-api.us-east-1.amazonaws.com/dev/graphql'
    // const requiredClaimTypes = JSON.stringify(Object.keys(selectClaims.requiredClaims).map(function (key) { return selectClaims.requiredClaims[key].claimType }))
    let query = {'query': `mutation {
      createApp(
        name: "${appDetails.appName}",
        description: "${serviceDetails.serviceDescription}",
        geography: "${serviceDetails.location}"
      ){name}}`
    }

    console.log(JSON.stringify(query))
    fetch(graphQLendpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': 'da2-7exthexql5ento676suttecqka'
      },
      body: JSON.stringify(query)
    })
    .then(res => res.json())
    .then(res => console.log(res))

    // this.props.getChildState('review', {complete: true})
  }
  render () {
    const { cancelModal } = this.state
    const { selectClaims, serviceDetails, appUrl, appDetails } = this.props
    console.log(selectClaims)
    return (
      <Wrapper>
        <section className={`${cancelModal ? 'blurred' : ''}`}>
          <Container>
            <Grid>
              <Spacer span={1} />
              <Col span={10}>
                <header>
                  <Grid>
                    <Col span={8}>
                      <h2>Review</h2>
                    </Col>
                    <Col span={4}>
                      <button className='btn-cancel' onClick={this.showCancelModal}>Cancel</button>
                    </Col>
                  </Grid>
                </header>
                <div className='module'>
                  <Grid>
                    <Spacer span={1} />
                    <Col span={5}>
                      <label>Issuer Name</label>
                      <p>{appDetails.appName}</p>
                      <hr />
                    </Col>
                    <Col span={5}>
                      <label>URL Address</label>
                      <p>{appUrl}</p>
                      <hr />
                    </Col>
                  </Grid>
                  <Grid>
                    <Spacer span={1} />
                    <Col span={10}>
                      <label>Service Name</label>
                      <p>{serviceDetails.serviceName}</p>
                      <hr />
                    </Col>
                  </Grid>
                  <Grid>
                    <Spacer span={1} />
                    <Col span={10}>
                      <label>Service Description</label>
                      <p>{serviceDetails.serviceDescription}</p>
                      <hr />
                    </Col>
                  </Grid>
                  <Grid>
                    <Spacer span={1} />
                    <Col span={10}>
                      <label>Required Claims</label>
                      {selectClaims.requiredClaims.map((requiredClaim) =>
                        <Grid>
                          <Col span={6}>
                            <p>{requiredClaim.claimType}</p>
                          </Col>
                          <Col span={6}>
                            <p>{requiredClaim.issuer}</p>
                          </Col>
                        </Grid>
                      )}
                      <hr />
                    </Col>
                  </Grid>
                  <Grid>
                    <Spacer span={1} />
                    <Col span={10}>
                      <label>Issued Claims</label>
                      {selectClaims.issuedClaims.map((issuedClaim) =>
                        <Grid>
                          <Col span={6}>
                            <p>{issuedClaim.claimType}</p>
                          </Col>
                        </Grid>
                      )}
                      <hr />             
                    </Col>
                  </Grid>
                </div>
              </Col>
            </Grid>
          </Container>
        </section>
        <CancelModal show={cancelModal} onClose={this.hideCancelModal} />
        <Footer
          Prev={() => (<div>
          CLAIMS
            <p>
              Required ({selectClaims.requiredClaims.length})
              <span>&nbsp;|&nbsp;</span>
              Issued ({selectClaims.issuedClaims.length})
            </p>
          </div>)}
          Next={() => <span>SUBMIT</span>}
          nextEnabled={true}
          onNext={this.handleSubmit} />
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  section {
    padding-bottom: 80px;
  }
  .module .disabled {
    background-color: #F8F8F8;
    border: none;
  }
`

export default Review
