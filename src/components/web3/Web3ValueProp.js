import React, {Component} from 'react'
import styled from 'styled-components'
import blueTick from '../../images/orange-tick.svg'
import UnorderedList from '../Layout/html/UnorderedList'
import { Container, Grid, Col, medium } from '../../layouts/grid'

class ServerValueProp extends Component {
  render() {
    return (
      <Wrapper>
        <Container>
          <Grid>
            <Col span={7}>
              <h2>
                Become a Trusted Issuer of Verifications
              </h2>
              <p>
                Using Uport Connect you can quickly begin to request and issue
                verified data about your users.  Each time a user verifies data they are
                also building their digital identity by recording their interaction with applications
                built by developers like yourselves.
              </p>
            </Col>
            <Col span={5}>
              <div className='border'>
                <UnorderedList>
                  <li>Create and verify authentication requests</li>
                  <li>Request verified claims</li>
                  <li>Verify claims for your users</li>
                  <li>Ask users to sign Ethereum transactions</li>
                  <li>Sign transactions</li>
                </UnorderedList>
              </div>
            </Col>
          </Grid>
        </Container>
      </Wrapper>
    );
  }
}

export default ServerValueProp

const Wrapper = styled.section`
  background-color: #fff;
  padding-top: 150px;
  padding-bottom: 150px;
  .border {
    box-shadow: 0px 0px 10px
    rgba(139, 139, 139, 0.25);
    border-radius: 8px;
    padding: 20px;
  }
  h2 {
    font-size: 30px;
    font-weight: 800;
    font-style: normal;
    line-height: 42px;
    margin: unset;
    margin: initial;
  }
  li {
    word-wrap: break-word;
    &:first-child {
      margin-top: 0;
    }
    &:last-child {
      margin-bottom: 0;
    }
    margin-bottom: 30px;
  }
  li::before {
    background-image: url(${blueTick});
  }
  p {
    font-size: 24px;
    line-height: 1.5;
    font-weight: normal;
    font-style: normal;
    padding-top: 20px;
    max-width: 692px;
  }
  ${medium(`
    .border {
      margin: 0 20px 0 0;
      max-width: 386px;
      padding: 40px;
    }
  `)}
`
