import React, {Component} from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import blob from '../../images/orange-blob.svg'
import track from '../../utilities/track'
import { Container, Grid, Col, medium } from '../../layouts/grid'

class Web3Solutions extends Component {
  track = (name) => () => {
    track(name, {
      source: 'Web3 Landing'
    })
  }
  render () {
    return (
      <Wrapper>
        <Container>
          <Grid>
            <Col span={12}>
              <a id='web3-solutions'>
                <h2>Solutions for Client-Side Applications</h2>
              </a>
            </Col>
            <Col span={6}>
              <Link to='/connect/login' onClick={this.track('Web3 Login Clicked')}>
                <div className='left block-item'>
                  <div className='block-content'>
                    <h4>Login</h4>
                    <p>uPort provides a simple solution for your users to log in to your app and share private credentials, such as identity information and contact details.</p>
                  </div>
                  <h3>LEARN MORE</h3>
                </div>
              </Link>
            </Col>
            <Col span={6}>
              <Link to='/connect/sendverification' onClick={this.track('Verifications Part 1 Clicked')}>
                <div className='right block-item'>
                  <div className='block-content'>
                    <h4>Verifications</h4>
                    <h5>Part 1</h5>
                    <p>Create and issue verifications to your users.  They can store these verifications on their mobile device and use them with applications that request them.</p>
                  </div>
                  <h3>LEARN MORE</h3>
                </div>
              </Link>
            </Col>
            <Col span={6}>
              <Link to='/connect/requestverification' onClick={this.track('Verifications Part 2 Clicked')}>
                <div className='left block-item'>
                  <div className='block-content'>
                    <h4>Verifications</h4>
                    <h5>Part 2</h5>
                    <p>Request and verify claims about your users to interact with their digital identity and add value to your application</p>
                  </div>
                  <h3>LEARN MORE</h3>
                </div>
              </Link>
            </Col>
          </Grid>
        </Container>
      </Wrapper>
    )
  }
}

export default Web3Solutions

const Wrapper = styled.section`
  margin-top: 150px;
  margin-bottom: -150px;
  .blob {
    display: none;
  }
  h2 {
    font-size: 32px;
    font-weight: bold;
    line-height: 40px;
  }
  h3 {
    color: #E77E55;
    text-align: right;
    margin: 0 40px 0 0;
  }
  h4 {
    font-size: 24px;
    line-height: 32px;
    margin: 0 0 25px;
    padding: 20px 0 0 0;
    a {
      text-decoration: none;
    }
  }
  h4, p {
    color: #3E3C49;
  }
  p {
    max-width: 93%;
  }
  .block-item {
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0px 0px 10px rgba(139, 139, 139, 0.25);
    display: grid;
    grid-template-rows: 1fr 80px;
    height: 100%;
    margin: 0;
    position: relative;
  }
  .block-content  {
    padding: 20px;
  }
  a {
    color: inherit;
    text-decoration: none;
  }

  ${medium(`
    .blob {
      display: block;
      padding: 40px 0 0 40px;
    }
    .block-content  {
      background: url(${blob}) 40px 40px no-repeat;
      padding: 0 40px 0 60px;
      top: 65px;
      z-index: 10;
    }
    h4 {
      padding: 75px 0 0 0;
    }
  `)}
`
