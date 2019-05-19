import React, { Component } from 'react'
import gql from 'graphql-tag'
import { Query,compose, graphql } from 'react-apollo'
import Select from 'react-select'
import styled from 'styled-components'
import CancelModal from '../CancelModal'
import AddClaimModal from './AddClaimModal'
import Footer from '../Footer'
import { Container, Grid, Col, Spacer, medium } from '../../../../layouts/grid'

function AddedIssuedClaims (props) {
  const { issuedClaims, issuedClaimTypeOptions } = props
  const addedIssuedClaims = issuedClaims.map((issuedClaim, index) =>
    <Grid key={index}>
      <Col span={6}>
        <label htmlFor='claimType'>Claim Type</label>
        <Select
          id='claimType'
          className='networkDropdown'
          classNamePrefix='networkDropdown'
          value={issuedClaim.claimType}
          onChange={(e) => props.handleAddedIssuedClaimTypeUpdate(index, e)}
          options={issuedClaimTypeOptions}
          isSearchable={false}
          blurInputOnSelect
        />
      </Col>
    </Grid>
  )
  return (
    <div>{addedIssuedClaims}</div>
  )
}

function AddedRequiredClaims (props) {
  const { requiredClaims, requiredClaimTypeOptions } = props
  const addedClaims = requiredClaims.map((requiredClaim, index) =>
    <Grid key={index}>
      <Col span={6}>
        <label htmlFor='issuedBy'>Issued By</label>
        <Query query={GET_ENTITIES}>
          {({ loading, error, data }) => {
            if (loading) return <div>Loading...</div>;
            if (error) return <div>Error :(</div>;
            let entityOptions = data.entities.nodes
            .filter(function(node) {
              if (node.issuerCredentials.nodes.length > 0) {return true}
              else {return false}
            })
            .map(function (node){
              return {value: node.rowId, label: node.name}
            })
            return (
              <Select
                id='issuedBy'
                className='networkDropdown'
                classNamePrefix='networkDropdown'
                value={requiredClaim.issuer}
                onChange={(e) => props.handleAddedRequiredClaimTypeUpdate(index, e)}
                options={entityOptions}
                isSearchable={false}
                isDisabled={true}
                blurInputOnSelect
              />
            )
          }}
        </Query>
        <Checkbox>
          <input
            type='checkbox'
            className='claimOptional'
            id={'claimOptional_' + index}
            value={``}
          />
          <label htmlFor={'claimOptional_' + index} />
          <span>This claim is optional</span>
        </Checkbox>
      </Col>
      <Col span={6}>
        <label htmlFor='claimType'>Claim Type</label>
        {requiredClaim.claimType ? 
          <Query query={GET_ISSUER_CREDENTIALS_BY_ENTITY} variables={{ rowId: requiredClaim.claimType.value}}>
            {({ loading, error, data }) => {
              if (loading) return <div>Loading...</div>;
              if (error) return <div>Error :(</div>;
              let issuerCredentials = data.entity.issuerCredentials.nodes.map(function (node){return {value: node.rowId, label: node.claimType}})
              return (
                <Select
                  id='claimType'
                  className='networkDropdown'
                  classNamePrefix='networkDropdown'
                  value={requiredClaim.claimType}
                  onChange={(e) => props.handleAddedRequiredClaimTypeUpdate(index, e)}
                  options={issuerCredentials}
                  isSearchable={false}
                  isDisabled={true}
                  blurInputOnSelect
                /> 
              )
            }}
          </Query>
          : null
        }
      </Col>
      <Spacer span={1} />
    </Grid>
  )
  return (
    <div>{addedClaims}</div>
  )
}

class SelectClaims extends Component {
  constructor (props) {
    super(props)
    this.state = {
      cancelModal: false,
      addClaimModal: false,
      requiredClaimType: null,
      requiredIssuer: null,
      optional: false,
      requiredClaimTypeOptions: props.selectClaims.requiredClaimTypeOptions,
      requiredClaims: props.selectClaims.requiredClaims,
      issuedClaimTypeOptions: props.selectClaims.issuedClaimTypeOptions,
      issuedClaims: props.selectClaims.issuedClaims,
      issuedClaimType: null,
      selectedClaimTypeObj: null,
      selectedIssuerObj: null,
      claimField: null
    }
    this.showAddClaimModal = this.showAddClaimModal.bind(this)
    this.handleNewClaimType = this.handleNewClaimType.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleRequiredClaimTypeChange = this.handleRequiredClaimTypeChange.bind(this)
    this.handleRequiredIssuerChange = this.handleRequiredIssuerChange.bind(this)
    this.handleIssuedClaimTypeChange = this.handleIssuedClaimTypeChange.bind(this)
    this.handleAddRequiredClaim = this.handleAddRequiredClaim.bind(this)
    this.handleAddIssuedClaim = this.handleAddIssuedClaim.bind(this)
    this.handleAddedRequiredClaimIssuerUpdate = this.handleAddedRequiredClaimIssuerUpdate.bind(this)
    this.handleAddedRequiredClaimTypeUpdate = this.handleAddedRequiredClaimTypeUpdate.bind(this)
    this.handleAddedIssuedClaimTypeUpdate = this.handleAddedIssuedClaimTypeUpdate.bind(this)
  }
  showAddClaimModal (type, index) {
    this.setState({ addClaimModal: true, claimField: {type: type, index: index} })
  }
  hideAddClaimModal = () => {
    this.setState({ addClaimModal: false, claimField: null })
  }
  handleRequiredClaimTypeChange (selectedOption) {
    if (selectedOption.value === 'addClaim') {
      this.showAddClaimModal('requiredClaimType', 0)
    } else {
      this.setState({requiredClaimType: selectedOption})
    }
  }
  handleIssuedClaimTypeChange (selectedOption) {
    if (selectedOption.value === 'addClaim') {
      this.showAddClaimModal('issuedClaimType', 0)
    } else {
      this.setState({issuedClaimType: selectedOption})
    }
  }
  handleRequiredIssuerChange (selectedOption) {
    this.setState({requiredIssuer: selectedOption})
  }
  handleAddRequiredClaim (e) {
    if (e) e.preventDefault()
    let requiredClaims = this.state.requiredClaims
    requiredClaims.push({
      claimType: this.state.requiredClaimType,
      issuer: this.state.requiredIssuer,
      optional: this.state.optional
    })
    this.setState({requiredClaims: requiredClaims, requiredClaimType: null, requiredIssuer: null})
  }
  handleAddIssuedClaim (e) {
    if (e) e.preventDefault()
    let issuedClaims = this.state.issuedClaims
    issuedClaims.push({claimType: this.state.issuedClaimType})
    this.setState({issuedClaims: issuedClaims, issuedClaimType: null})
  }
  handleAddedRequiredClaimTypeUpdate (index, selectedOption) {
    let requiredClaims = this.state.requiredClaims
    requiredClaims[index].claimType = selectedOption.value
    this.setState({requiredClaims: requiredClaims})
  }
  handleAddedRequiredClaimIssuerUpdate (index, selectedOption) {
    let requiredClaims = this.state.requiredClaims
    if (selectedOption.value === 'addClaim') {
      this.showAddClaimModal('addedRequiredClaimType', index)
    } else {
      requiredClaims[index].issuer = selectedOption.value
      this.setState({requiredClaims: requiredClaims})
    }
  }
  handleAddedIssuedClaimTypeUpdate (index, selectedOption) {
    let issuedClaims = this.state.issuedClaims
    if (selectedOption.value === 'addClaim') {
      this.showAddClaimModal('addedIssuedClaimType', index)
    } else {
      issuedClaims[index].claimType = selectedOption.value
      this.setState({issuedClaims: issuedClaims})
    }
  }
  handleNewClaimType (newClaimType, claimField) {
    const { issuedClaims, requiredClaims, requiredClaimTypeOptions, issuedClaimTypeOptions } = this.state
    if (claimField) {
      switch (claimField.type) {
        case 'issuedClaimType':
          issuedClaimTypeOptions.unshift({value: newClaimType, label: newClaimType})
          this.setState({issuedClaimType: issuedClaimTypeOptions[0]})
          break;
        case 'requiredClaimType':
          requiredClaimTypeOptions.unshift({value: newClaimType, label: newClaimType})
          this.setState({
            requiredClaimType: requiredClaimTypeOptions[0],
            requiredClaimTypeOptions: requiredClaimTypeOptions
          })
          break;
        case 'addedIssuedClaimType':
          issuedClaimTypeOptions.unshift({value: newClaimType, label: newClaimType})
          issuedClaims[claimField.index].claimType = newClaimType
          this.setState({issuedClaims: issuedClaims})
          break;
        case 'addedRequiredClaimType':
          requiredClaimTypeOptions.unshift({value: newClaimType, label: newClaimType})
          requiredClaims[claimField.index].claimType = newClaimType
          this.setState({requiredClaims: requiredClaims})
          break;
      }
    }
    this.hideAddClaimModal()
  }
  handleSubmit (e) {
    const { requiredClaims, issuedClaims, requiredClaimTypeOptions, issuedClaimTypeOptions } = this.state
    this.props.getChildState('selectClaims', {
      requiredClaims: requiredClaims,
      issuedClaims: issuedClaims,
      requiredClaimTypeOptions: requiredClaimTypeOptions,
      issuedClaimTypeOptions: issuedClaimTypeOptions
    })
  }
  render () {
    const { cancelModal, addClaimModal, requiredClaims, issuedClaims, claimField, requiredClaimTypeOptions, issuedClaimTypeOptions } = this.state
    const { appDetails, serviceDetails, getEntities } = this.props
    return (
      <Wrapper>
        <section className={`${cancelModal || addClaimModal ? 'blurred' : ''}`}>
          <Container>
            <Grid>
              <Spacer span={1} />
              <Col span={10}>
                <header>
                  <Grid>
                    <Col span={8}>
                      <h2>Select Claims</h2>
                    </Col>
                    <Col span={4}>
                      <button className='btn-cancel' onClick={this.showCancelModal}>Cancel</button>
                    </Col>
                  </Grid>
                </header>
                <div className='module'>
                  <Grid>
                    <Spacer span={1} />
                    <Col span={10}>
                      <h2>Claims your service issues</h2>
                        <form>
                          <p>Verified information about your users they receive while using your services</p>
                          <AddedIssuedClaims
                            issuedClaims={issuedClaims}
                            issuedClaimTypeOptions={issuedClaimTypeOptions}
                            handleAddedIssuedClaimTypeUpdate={this.handleAddedIssuedClaimTypeUpdate}
                          />
                          <Grid>
                            <Col span={6}>
                              <label htmlFor='issuedClaimType'>ClaimType</label>
                              <Select
                                id='issuedClaimType'
                                className='networkDropdown'
                                classNamePrefix='networkDropdown'
                                value={this.state.issuedClaimType}
                                onChange={this.handleIssuedClaimTypeChange}
                                options={issuedClaimTypeOptions}
                                isSearchable={false}
                                blurInputOnSelect
                              />
                            </Col>
                          </Grid>
                          <Grid>
                            <Col span={12}>
                              <AddClaim onClick={this.handleAddIssuedClaim}>+ Add Claim</AddClaim>
                            </Col>
                          </Grid>
                          <h2>Claims your service requires</h2>
                          <p>Information that you want to request from users in order to let them use your service. Select Issuer to specify who this information should be verified by.</p>
                          <AddedRequiredClaims
                            requiredClaims={requiredClaims}
                            requiredClaimTypeOptions={requiredClaimTypeOptions}
                            handleAddedRequiredClaimTypeUpdate={this.handleAddedRequiredClaimTypeUpdate}
                            handleAddedRequiredClaimIssuerUpdate={this.handleAddedRequiredClaimIssuerUpdate}
                          />
                          <Grid>
                            <Col span={6}>
                              <label htmlFor='issuedBy'>Issued By</label>
                              <Query query={GET_ENTITIES}>
                                {({ loading, error, data }) => {
                                  if (loading) return <div>Loading...</div>;
                                  if (error) return <div>Error :(</div>;
                                  let entityOptions = data.entities.nodes
                                  .filter(function(node) {
                                    if (node.issuerCredentials.nodes.length > 0) {return true}
                                    else {return false}
                                  })
                                  .map(function (node){
                                    return {value: node.rowId, label: node.name}
                                  })
                                  return (
                                    <Select
                                      id='issuedBy'
                                      className='networkDropdown'
                                      classNamePrefix='networkDropdown'
                                      value={this.state.requiredIssuer}
                                      onChange={this.handleRequiredIssuerChange}
                                      options={entityOptions}
                                      isSearchable={false}
                                      blurInputOnSelect
                                    />
                                  )
                                }}
                              </Query>
                              <Checkbox>
                                <input
                                  type='checkbox'
                                  className='claimOptional'
                                  id='global'
                                  value={``}
                                  ref={r => this.txtServiceName=r}
                                />
                                <label htmlFor='claimOptional' />
                                <span>This claim is optional</span>
                              </Checkbox>
                            </Col>
                            <Col span={6}>
                              <label htmlFor='claimType'>Claim Type</label>
                              {this.state.requiredIssuer ? 
                              <Query query={GET_ISSUER_CREDENTIALS_BY_ENTITY} variables={{ rowId: this.state.requiredIssuer.value}}>
                                {({ loading, error, data }) => {
                                  if (loading) return <div>Loading...</div>;
                                  if (error) return <div>Error :(</div>;
                                  let issuerCredentials = data.entity.issuerCredentials.nodes.map(function (node){return {value: node.rowId, label: node.claimType}})
                                  return (
                                    <Select
                                      id='claimType'
                                      className='networkDropdown'
                                      classNamePrefix='networkDropdown'
                                      value={this.state.requiredClaimType}
                                      onChange={this.handleRequiredClaimTypeChange}
                                      options={issuerCredentials}
                                      isSearchable={false}
                                      isDisabled={false}
                                      blurInputOnSelect
                                    /> 
                                  )
                                }}
                              </Query>
                              : null
                            }
                              
                            </Col>
                            <Col span={12}>
                              <AddClaim onClick={this.handleAddRequiredClaim}>+ Add Claim</AddClaim>
                            </Col>
                        </Grid>
                      </form>
                    </Col>
                  </Grid>
                </div>
              </Col>
            </Grid>
          </Container>
        </section>
        <CancelModal show={cancelModal} onClose={this.hideCancelModal} />
        <AddClaimModal show={addClaimModal} handleNewClaimType={this.handleNewClaimType} claimField={claimField} onClose={this.hideAddClaimModal} />
        <Footer
          Prev={() => (<div>
          SERVICE DETAILS
            <p>
              {appDetails.appName}
              <span>&nbsp;|&nbsp;</span>
              {serviceDetails.serviceName}
            </p>
          </div>)}
          Next={() => <span>SELECT CLAIMS</span>}
          nextEnabled={true}
          onNext={this.handleSubmit}
          onPrev={this.props.previousStep} />
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  section {
    padding-bottom: 80px;
  }
`
const Checkbox = styled.div`
  label {
    display: inline;
  }
  .claimOptional {
    display: none;
  }
  .claimOptional + label {
    background-color: #fafafa;
    border: 1px solid #cacece;
    box-shadow: 0 1px 2px rgba(0,0,0,0.05), inset 0px -15px 10px -12px rgba(0,0,0,0.05);
    padding: 15px;
    border-radius: 3px;
    display: inline-block;
    position: relative;
  }
  .claimOptional + label:active, .claimOptional:checked + label:active {
    box-shadow: 0 1px 2px rgba(0,0,0,0.05), inset 0px 1px 3px rgba(0,0,0,0.1);
  }
  .claimOptional:checked + label {
    background-color: #e9ecee;
    border: 1px solid #adb8c0;
    box-shadow: 0 1px 2px rgba(0,0,0,0.05), inset 0px -15px 10px -12px rgba(0,0,0,0.05), inset 15px 10px -12px rgba(255,255,255,0.1);
    color: #99a1a7;
  }
  .claimOptional:checked + label:after {
    content: 'x';
    font-size: 16px;
    position: absolute;
    top: 6px;
    left: 10px;
    color: #99a1a7;
  }
  span {
    position:absolute;
    margin-top: 7px;
    margin-left: 10px;
    font-size: 16px;
    color: #3f3d4b;
  }
`

const AddClaim = styled.button`
  background-color: #fff;
  border: solid 2px #5c50ca;
  border-radius: 4px;
  display: block;
  padding: 20px;
  margin: 0 0 10px 0;
  text-decoration: none;
  text-transform: uppercase;
  width: 100%;
  font-weight: bold;
  color: #5c50ca;
  ${medium(`
    display: inline-block;
  `)}
`

// GraphQL Queries
const GET_ENTITIES = gql` 
  query {
    entities {
      nodes {
        id
        rowId
        name
        issuerCredentials {
          nodes {
            rowId
            claimType
          }
        }
      }
    }
  }
`

const GET_ISSUER_CREDENTIALS_BY_ENTITY = gql` 
  query($rowId: Int!) {
    entity(rowId: $rowId) {
      name
      issuerCredentials {
        nodes {
          rowId
          claimType
        }
      }
    }
  }
`

export default SelectClaims
