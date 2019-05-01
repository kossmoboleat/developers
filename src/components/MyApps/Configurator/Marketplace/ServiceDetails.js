import React, { Component } from 'react'
import styled from 'styled-components'
import config from '../../../../../data/SiteConfig'
import Select from 'react-select'
import CancelModal from '../CancelModal'
import Footer from '../Footer'
import { Container, Grid, Col, Spacer } from '../../../../layouts/grid'

const locationOptions = [
  { value: 'europe', label: 'Europe' },
  { value: 'northAmerica', label: 'North America' },
  { value: 'southAmerica', label: 'South America' },
  { value: 'africa', label: 'Africa' },
  { value: 'asia', label: 'Asia' }
]

class ServiceDetails extends Component {
  constructor (props) {
    super(props)
    this.state = {
      cancelModal: false,
      formSubmitted: false,
      serviceName: props.serviceDetails.serviceName,
      serviceDescription: props.serviceDetails.serviceDescription,
      location: props.serviceDetails.location,
      globalCheckbox: props.serviceDetails.global,
      selectedLocationObj: locationOptions.find(n => n.value === props.serviceDetails.location) || null
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleServiceNameChange = this.handleServiceNameChange.bind(this)
    this.handleServiceDescriptionChange = this.handleServiceDescriptionChange.bind(this)
    this.handleLocationChange = this.handleLocationChange.bind(this)
  }
  handleSubmit (e) {
    const { appDetails, appUrl } = this.props
    const { serviceName, serviceDescription, location, globalCheckbox } = this.state

    let query = {'query': `mutation {
      createEntity(
        input: {
          entity: {
            name: "${appDetails.appName}",
            url: "${appUrl}",
            serviceName: "${serviceName}"
            serviceDescription: "${serviceDescription}"
          }
        }
      )
      {
        entity {
          name
          url
          serviceName
          serviceDescription
        }
      }
      }`
    }
    fetch(config.marketplaceEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(query)
    })
    .then(res => res.json())
    .then(res => console.log(res))

    this.props.getChildState('serviceDetails', {
      serviceName: serviceName,
      serviceDescription: serviceDescription,
      location: location,
      global: globalCheckbox
    })
  }
  handleServiceNameChange (e) {
    this.setState({serviceName: e.target.value})
  }
  handleServiceDescriptionChange (e) {
    this.setState({serviceDescription: e.target.value})
  }
  handleLocationChange (selectedOption) {
    this.setState({
      location: selectedOption.value,
      selectedLocationObj: selectedOption
    })
  }
  render () {
    const { appDetails } = this.props
    const { serviceName, serviceDescription, cancelModal, globalCheckbox, selectedLocationObj } = this.state
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
                      <h2>Add Service Details</h2>
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
                      <form>
                        <Grid>
                          <Col span={6}>
                            <label htmlFor='issuerName'>Issuer Name</label>
                            <input
                              className={`disabled`}
                              type='text'
                              id='issuerName'
                              value={appDetails.appName}
                              ref={r => this.txtIssuerName=r}
                              readOnly
                            />
                          </Col>
                          <Col span={6}>
                            <label htmlFor='urlAddress'>URL Address</label>
                            <input
                              className={`disabled`}
                              type='text'
                              id='urlAddress'
                              value={this.props.appUrl}
                              ref={r => this.txtUrlAddress=r}
                              readOnly />
                          </Col>
                        </Grid>
                        <label htmlFor='serviceName'>Service Name</label>
                        <input
                          type='text'
                          placeholder={`e.g. city ID, event tickets, educational certificate`}
                          id='serviceName'
                          value={serviceName}
                          onChange={this.handleServiceNameChange}
                          ref={r => this.txtServiceName=r} />
                        <Explanation>
                          <span>MAKE SURE USERS CAN FIND YOUR SERVICE EASILY</span>
                          <hr />
                          <p>If your service is related to a certain event (e.g. ETHGlobal), location (e.g. City of Cleveland), business or organization (e.g. New York City University) make sure you include it in the name.</p>
                        </Explanation>
                        <label htmlFor='serviceDescription'>Service Description</label>
                        <textarea
                          rows='6'
                          cols='50'
                          placeholder={`e.g. city ID, event tickets, educational certificate`}
                          value={serviceDescription}
                          onChange={this.handleServiceDescriptionChange}
                        />
                        <label htmlFor='location'>Location</label>
                        <Select
                          id='location'
                          className='networkDropdown'
                          classNamePrefix='networkDropdown'
                          value={selectedLocationObj}
                          onChange={this.handleLocationChange}
                          options={locationOptions}
                          isSearchable={false}
                          blurInputOnSelect
                        />
                        <Checkbox>
                          <input
                            type='checkbox'
                            className='globalCheckbox'
                            id='global'
                            value={globalCheckbox}
                            ref={r => this.txtServiceName=r}
                          />
                          <label htmlFor='global' />
                          <label htmlFor='global'>Services my app provides are global</label>
                        </Checkbox>
                      </form>
                    </Col>
                    <Spacer span={1} />
                  </Grid>
                </div>
              </Col>
              <Spacer span={1} />
            </Grid>
          </Container>
        </section>
        <CancelModal show={cancelModal} onClose={this.hideCancelModal} />
        <Footer
          Next={() => <span>SELECT CLAIMS</span>}
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

const Checkbox = styled.div`
  display: flex;
  align-items: center;
  .globalCheckbox {
    display: none;
  }
  .globalCheckbox + label {
    background-color: #fafafa;
    border: 1px solid #cacece;
    box-shadow: 0 1px 2px rgba(0,0,0,0.05), inset 0px -15px 10px -12px rgba(0,0,0,0.05);
    padding: 15px;
    border-radius: 3px;
    display: inline-block;
    position: relative;
  }
  .globalCheckbox + label:active, .globalCheckbox:checked + label:active {
    box-shadow: 0 1px 2px rgba(0,0,0,0.05), inset 0px 1px 3px rgba(0,0,0,0.1);
  }
  .globalCheckbox:checked + label {
    background-color: #e9ecee;
    border: 1px solid #adb8c0;
    box-shadow: 0 1px 2px rgba(0,0,0,0.05), inset 0px -15px 10px -12px rgba(0,0,0,0.05), inset 15px 10px -12px rgba(255,255,255,0.1);
    color: #99a1a7;
  }
  .globalCheckbox:checked + label:after {
    content: '\00d7';
    font-size: 24px;
    position: absolute;
    top: 5px;
    left: 8px;
    color: #99a1a7;
  }
  label:last-child {
    font-size: 16px;
    color: #3f3d4b;
    font-weight: normal;
    text-transform: none;
    margin: 0 0 0 10px;
  }
`

const Explanation = styled.div`
  background-color: #fcf2e5;
  margin-top: 30px;
  padding: 30px;
  margin: 30px auto;
  border-radius: 3px;
  color: #5F5D68;
  span {
    font-size: 14px;
    font-weight: 600;
  }
  p {
    color: #5F5D68;
    font-size: 16px;
    font-weight: 400;
  }
`

export default ServiceDetails
