import React, {Component} from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

class ServerVerificationResources extends Component {
  render () {
    return (
      <Resources>
        <div className='grid'>
          <div>
            <h2>Additional Resources</h2>
            <h3>Libraries</h3>
          </div>
          <div/>
          <div/>
          <div className='block-item'>
            <Link to='/categories/transports'>
              <h4>Transports    &#x2192;</h4>
              <p>Setup communication channels between your app and uPort clients.</p>
            </Link>
            <div className={'code-block'}>
              <span>npm -i uport-transports</span>
            </div>
          </div>
          <div className='block-item'>
            <Link to='/categories/ethr-did'>
              <h4>EthrDID    &#x2192;</h4>
              <p>Create Decentralized Identifiers and manage their interactions in your app.</p>
            </Link>
            <div className={'code-block'}>
              <span>npm -i ethr-did</span>
            </div>
          </div>
          <div className='block-item'>
            <Link to='/categories/ethr-did-registry'>
              <h4>Ethr DID Registry    &#x2192;</h4>
              <p>Smart contract to resolve and manage decentralized identifiers (DIDs)</p>
            </Link>
            <div className={'code-block'}>
              <span>npm -i ethr-did-registry</span>
            </div>
          </div>
        </div>
      </Resources>
    )
  }
}

export default ServerVerificationResources

const Resources = styled.section`
padding-top: 150px;
margin-bottom: 154px;
background-color: #fff;
.grid {
  display: grid;
  grid-template-columns: auto auto auto;
  grid-template-rows: auto auto;
  grid-gap: 30px;
  justify-content: center;
  p {
    font-size: unset;
    font-size: initial;
    font-size: 16px:
    line-height: 22px;
    margin-bottom: unset;
    margin-bottom: initial;
    padding: 11px 0 20px 20px;
    max-width: 90%;
  }
  h3, h4 {
  color: #8986A0;
  font-size: 24px;
  line-height: 18px;
  }
  h4 {
    color: #4C9EA6;
    padding: 20px 0 0 20px;
    margin: 0;
  }
}
h2 {
  font-size: 32px;
  font-weight: bold;
  line-height: 40px;
}
.code-block {
  display: table;
  border-radius: 4px
  background-color: #f9f9fa;
  margin: 0 20px 21px 20px;
  width: 347px;
  height: 50px;
  font-size: 16px;
  line-height: 19px;
  font-family: Menlo, Monaco, "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L", "Courier New", Courier, monospace;
  color: #3db77d;
  white-space: nowrap;
  span {
    display: table-cell;
    vertical-align: middle;
    padding: 13px 0px 18px 20px;
  }
}
.block-item {
  width: 387px;
  height: 195px;
  box-shadow: 0px 0px 4px
  rgba(0,0,0, 0.25);
  border-radius: 4px;
}
a {
    color: inherit;
    text-decoration: none;
}

@media screen and (max-width: 600px) {
  .code-block, .block-item {
    width: 90%;
    height: 100%;
  }
  .block-item {
    padding: 5px;
    margin-left: 25px;
    p {
      max-width: 100%;
    }
  }
  .wrapper {
    padding: 0;
  }
}
`
