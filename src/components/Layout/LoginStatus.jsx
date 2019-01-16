import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'gatsby'
import onClickOutside from 'react-onclickoutside'

import * as actions from '../../actions'
import LoginModal from '../UportLogin'

class LoginStatus extends Component {
  constructor (props) {
    super(props)
    this.state = {
      visible: false,
      loginModal: false
    }
    this.toggleMenu = this.toggleMenu.bind(this)
    this.loginRequest = this.loginRequest.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
  }
  componentDidMount() {
    // this.props.initCredentials()
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
    this.setState({ loginModal: true })
  }
  handleLoginSuccess = (profile) => {
    this.setState({ loginModal: false })
    this.props.saveProfile({
      name: profile.name,
      did: profile.did,
      uportApps: profile['uport-apps'] || [],
      pushToken: profile.pushToken,
      publicEncKey: profile.boxPub
    })
  }
  hideLoginModal = () => {
    this.setState({ loginModal: false })
  }
  handleLogout () {
    // uPortConnect.logout()
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
        <LoginModal
          show={this.state.loginModal}
          onClose={this.hideLoginModal}
          onLoginSuccess={this.handleLoginSuccess} />
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

const mapDispatchToProps = dispatch => ({
  saveProfile(profile) {
    dispatch(actions.saveProfile(profile))
  },
  setCurrentApp(app, index) {
    dispatch(actions.setCurrentApp(app, index))
  },
  logout() {
    dispatch(actions.logout())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(onClickOutside(LoginStatus))
