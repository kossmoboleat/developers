import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { Grid, Col } from '../../layouts/grid'
import myAppsBg from '../../images/myapps-bg.svg'

class AppList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      bgImageStyles: []
    }
  }
  componentDidMount () {
    let bgImageArray = this.state.bgImageStyles
    this.props.profile.uportApps.map((app, index) => {
      if (app.configuration.profileImage) {
        let profileImageURL = 'https://ipfs.io' + app.configuration.profileImage
        bgImageArray[index] = {backgroundImage: `url(${profileImageURL})`}
        this.setState({bgImageStyles: bgImageArray})
        return {backgroundImage: `url(${profileImageURL})`}
      } else {
        return {backgroundImage: `url(${myAppsBg})`}
      }
    })
  }
  handleAppItemClick (event, index) {
    this.props.clearCurrentApp()
    this.props.setCurrentApp(this.props.profile.uportApps[index], index)
    this.props.history.push('/myapps/detail')
  }
  render () {
    const { uportApps } = this.props.profile
    return (<Wrapper>
      <Grid>
        {uportApps.map((app, index) => (<Col span={4}
          className='appItem'
          key={index}
          onClick={(e) => { this.handleAppItemClick(e, index) }}
        >
          <div className='appCover'
            style={{backgroundColor: app.configuration.accentColor || '#5c54c7'}}
          >&nbsp;</div>
          <div className={'avatar ' + (app.configuration.profileImage ? 'uploaded' : 'default')}
            style={this.state.bgImageStyles[index]}
          >&nbsp;</div>
          <h3>{app.name}</h3>
          <span>{app.configuration.network}</span>
        </Col>))}
      </Grid>
    </Wrapper>)
  }
}

AppList.propTypes = {
  profile: PropTypes.object.isRequired,
  setCurrentApp: PropTypes.func.isRequired,
  clearCurrentApp: PropTypes.func.isRequired
}

const Wrapper = styled.div`
  .appItem {
    float: none;
    margin: 0;
    width: auto;
    min-width: auto;
  }
`

const mapStateToProps = ({ profile, currentApp }) => {
  return { profile, currentApp }
}

const mapDispatchToProps = dispatch => {
  return {
    setCurrentApp: (app, index) => dispatch({ type: `SET_CURRENT_APP`, app: app, index: index }),
    clearCurrentApp: () => dispatch({ type: `CLEAR_CURRENT_APP` })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppList)
