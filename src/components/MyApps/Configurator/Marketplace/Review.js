import React, { Component } from 'react'
import gql from 'graphql-tag'
import { Mutation, compose, graphql } from 'react-apollo'
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
  handleSubmit () {
    const { selectClaims, serviceDetails, appUrl, appDetails } = this.props
    this.props.createEntity({
      variables: {
        name: appDetails.appName,
        url: appUrl,
        did: appDetails.appIdentity.did,
        serviceName: serviceDetails.serviceName,
        serviceDescription: serviceDetails.serviceDescription
      }
    }).then((createEntityResponse) => {
      console.log(createEntityResponse)
      let entityRowId = createEntityResponse.data.createEntity.entity.rowId
      var self = this
      selectClaims.issuedClaims.forEach(function (issuedClaim) {
        self.props.createIssuerCredential({
          variables: {
            claimType: issuedClaim.claimType.label,
            entityId: entityRowId
          }
        }).then((createIssuerCredentialResponse) => {
          console.log(createIssuerCredentialResponse)
        })
      })
      selectClaims.requiredClaims.forEach(function (verifierClaim) {
        console.log(verifierClaim)
        self.props.createVerifierCredential({
          variables: {
            entityId: entityRowId,
            issuerCredentialId: verifierClaim.claimType.value
          }
        }).then((createVerifierCredentialResponse) => {
          console.log(createVerifierCredentialResponse)
        })
      })
      this.props.getChildState('review', {complete: true})
    })
  }
  render () {
    const { cancelModal } = this.state
    const { selectClaims, serviceDetails, appUrl, appDetails } = this.props
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
                      <label>Issued Claims</label>
                      {selectClaims.issuedClaims.map((issuedClaim) =>
                        <Grid>
                          <Col span={6}>
                            <p key={issuedClaim.claimType.value}>{issuedClaim.claimType.label}</p>
                          </Col>
                        </Grid>
                      )}
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
                            <p>{requiredClaim.issuer.label}</p>
                          </Col>
                          <Col span={6}>
                            <p>{requiredClaim.claimType.label}</p>
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
          onNext={this.handleSubmit}
          onPrev={this.props.previousStep}
          nextEnabled
        />
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

const CREATE_ENTITY = gql`
  mutation createEntity($name: String!, $url: String, $serviceName: String, $serviceDescription: String) {
    createEntity(
      input: { 
        entity: {
          name: $name, 
          url: $url, 
          serviceName: $serviceName, 
          serviceDescription: $serviceDescription
        }
      }
    ) 
    {
      entity {
        id
        rowId
        name
        url
        serviceName
      }
    }
  }
`

// GraphQL Queries
const CREATE_ISSUER_CREDENTIAL = gql`
  mutation createIssuerCredentials($claimType: String!, $entityId: Int!) {
    createIssuerCredential(input: {
      issuerCredential: {
        claimType: $claimType,
        entityId: $entityId
      }
    })
    {
      issuerCredential {
        id
        claimType
        entity {
          name
        }
      }
    }
  }
`

const CREATE_VERIFIER_CREDENTIAL = gql`
  mutation createVerifierCredential($entityId: Int!, $issuerCredentialId: Int!) {
    createVerifierCredential(input: {
      verifierCredential: {
        entityId: $entityId,
        issuerCredentialId: $issuerCredentialId 
      }
    })
    {
      verifierCredential {
        issuerCredential {
          claimType
        }
        entity {
          name
        }
      }
    }
  }
`

export default compose(
  graphql(CREATE_ENTITY, {name: 'createEntity'}),
  graphql(CREATE_ISSUER_CREDENTIAL, {name: 'createIssuerCredential'}),
  graphql(CREATE_VERIFIER_CREDENTIAL, {name: 'createVerifierCredential'})
)(Review)
