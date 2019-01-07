import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { uPortConnect } from '../../utilities/uPortConnectSetup'
import Link from 'gatsby-link'
import onClickOutside from 'react-onclickoutside'

class LoginStatus extends Component {
  constructor (props) {
    super(props)
    this.state = {
      visible: false
    }
    this.toggleMenu = this.toggleMenu.bind(this)
    this.loginRequest = this.loginRequest.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
  }
  toggleMenu (e) {
    e.preventDefault()
    this.setState({visible: !this.state.visible})
  }
  handleClickOutside (e) {
    this.setState({visible: false})
  }
  loginRequest (e) {
    e.preventDefault()
    try {
      uPortConnect.requestDisclosure({requested: ['name'], verified: ['uport-apps'], notifications: true})
      uPortConnect.onResponse('disclosureReq').then(response => {
        this.props.saveProfile({name: response.payload.name, did: response.payload.did, uportApps: response.payload['uport-apps']})
      })
    } catch (e) {
      console.log(e)
    }
  }
  handleLogout () {
    uPortConnect.logout()
    this.props.logout()
  }
  render () {
    let appItems
    if (this.props.profile.uportApps) {
      appItems = this.props.profile.uportApps.map((app, index) =>
        <li key={index} onClick={() => { this.props.setCurrentApp(this.props.profile.uportApps[index], index) }}><Link to='/myapps/detail'>{app.name}</Link></li>
      )
    }
    return (
      <div className={'loginStatus ' + (this.state.visible ? 'open' : 'closed')}>
        { Object.keys(this.props.profile).length === 0
        ? <div>
          <a href='#' className={`nav-link w-nav-link`} onClick={(e) => { this.loginRequest(e) }}>Log In</a>
          <Link to='/myapps/configurator' className={`nav-link w-nav-link register-app`}>Register Your App</Link>
        </div>
        : <div>
          <a href='#' className={`nav-link w-nav-link myapps-nav`} onClick={(e) => { this.toggleMenu(e) }}>MyApps</a>
          {this.state.visible &&
            <ul className='myAppsDropdown'>
              <li className=''><Link to='/myapps/configurator'>Register Your App</Link></li>
              {this.props.profile.uportApps ? <li className=''><Link to='/myapps/list'>MyApps List</Link></li> : null}
              {this.props.profile.uportApps ? appItems : null}
              <li className='logout' onClick={() => { this.handleLogout() }}><a href='#'>Logout</a></li>
            </ul>
          }
        </div>
        }
      </div>
    )
  }
}

LoginStatus.propTypes = {
  profile: PropTypes.object.isRequired,
  saveProfile: PropTypes.func.isRequired,
  setCurrentApp: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired
}

const mapStateToProps = ({ profile }) => {
  return { profile }
}

const mapDispatchToProps = dispatch => {
  return {
    saveProfile: (profile) => dispatch({ type: `SAVE_PROFILE`, profile: profile }),
    setCurrentApp: (app, index) => dispatch({ type: `SET_CURRENT_APP`, app: app, index: index }),
    logout: () => dispatch({ type: 'LOGOUT' })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(onClickOutside(LoginStatus))
