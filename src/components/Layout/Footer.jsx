import React from 'react'
import styled from 'styled-components'
import track from '../../utilities/track'
import { Link } from 'gatsby'

const FooterContainer = styled.section`
  display: flex;
  flex-direction: column;
  padding-bottom: 60px;
  h2 {
    text-align: center;
    color: #fff;
    padding: 40px 0 20px;
  }
  .footer-menu {
    color: #fff;
    padding: 0 40px;
    h4 {
      font-size: 1.1em;
    }
    ul {
      padding-left: 0;
    }
    li {
      padding: 5px 0;
    }
    h4 {
      text-transform: uppercase;
    }
  }
  .button-wrap .Grid-cell:last-child {
   margin-left: 20px;
  }
`

class Footer extends React.Component {
  track = (name, properties={}) => () => {
    track(name, {
      source: 'Footer',
      ...properties
    })
  }
  render () {
    return (
      <FooterContainer>
        <div className={'Grid Grid--gutters'}>
          <div className='Grid-cell'>
            <h2>Join A Network Of Developers Building on uPort</h2>
          </div>
        </div>
        <div className={'Grid Grid--gutters button-wrap'}>
          <div className='Grid-cell'>
            <a href='https://uport.zendesk.com/hc/en-us' onClick={this.track('Join The Community Clicked')}>
              <button>Join The Community</button>
            </a>
          </div>
          <div className='Grid-cell'>
            <a href='https://github.com/uport-project' onClick={this.track('Github uPort Projects Opened')}>
              <button>Explore uPort Projects</button>
            </a>
          </div>
        </div>
        <div className='footer-menu-wrap Grid'>
          <div className='footer-menu Grid-cell'>
            <h4>Apps</h4>
            <ul>
              <li>
                <a
                  href='https://itunes.apple.com/us/app/uport-id/id1123434510'
                  onClick={this.track('iTunes Opened')}
                >Wallet</a>
              </li>
            </ul>
          </div>
          <div className='footer-menu Grid-cell'>
            <h4>Platform</h4>
            <ul>
              <li><Link to='/overview/index' onClick={this.track('Overview Clicked')}>Overview</Link></li>
              <li><Link to='/categories/specs' onClick={this.track('Specs Clicked')}>Protocols</Link></li>
            </ul>
          </div>
          {/* <div className='footer-menu Grid-cell'> */}
          {/*   <h4>Solutions</h4> */}
          {/*   <ul> */}
          {/*     <li><a href='/flows/privatechain'>Private Credentials</a></li> */}
          {/*     <li><a href='/categories/uport-connect'>Authentication</a></li> */}
          {/*     {/\* <li><a href='#'>Ethereum Apps</a></li>  *\/} */}
          {/*     <li><a href='/signtransactions'>Mobile Signing / 2FA</a></li> */}
          {/*   </ul> */}
          {/* </div> */}
          <div className='footer-menu Grid-cell'>
            <h4>Guides</h4>
            <ul>
              {/* <li><a href='#'>Build a hybrid dapp</a></li> */}
              {/* <li><a href='#'>Authenticate Wallet</a></li> */}
              <li><Link to='/uport-connect/guides/usage' onClick={this.track('Connect Guide Clicked')}>Connect</Link></li>
              <li><Link to='/uport-credentials/guides/tutorial' onClick={this.track('Credentials Guide Clicked')}>Credentials</Link></li>
              <li><Link to='/uport-transports/guides/modules' onClick={this.track('Transports Guide Clicked')}>Transports</Link></li>
            </ul>
          </div>
          <div className='footer-menu Grid-cell'>
            <h4>About</h4>
            <ul>
              {/* <li><a href='#'>Mission</a></li> */}
              {/* <li><a href='#'>Team</a></li> */}
              <li><a href='https://www.uport.me/job-listings' onClick={this.track('Job Listing Opened')}>Jobs (We're Hiring)</a></li>
              <li><a href='https://consensys.net' onClick={this.track('ConsenSys Website Opened')}>ConsenSys</a></li>
            </ul>
        </div>
        </div>
      </FooterContainer>
    )
  }
}

export default Footer
