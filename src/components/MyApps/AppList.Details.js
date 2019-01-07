import React from 'react'
import { Grid, Col } from '../../layouts/grid'

export default props => (<div className='detailsContainer'>
  <Grid>
    <Col span={6}>
      <div className='field'>
        <h4 className='label'>App Name</h4>
        <p>{props.currentApp.name}</p>
      </div>
      {props.currentApp.configuration.url
        ? <div className='field'>
          <h4 className='label'>URL Address</h4>
          <p>{props.currentApp.configuration.url}</p>
        </div>
        : null
      }
      {props.currentApp.configuration.description
        ? <div className='field'>
          <h4 className='label'>App Description</h4>
          <p>{props.currentApp.configuration.description}</p>
        </div>
        : null
      }
      {props.currentApp.configuration.accentColor
        ? <div className='field'>
          <h4 className='label'>App Accent Color</h4>
          <p>{props.currentApp.configuration.accentColor}</p>
        </div>
        : null
      }
    </Col>
    <Col span={6}>
      <div className='previewContainer'>
        <div className='appItem'>
          <div className='appCover' style={{backgroundColor: props.currentApp.configuration.accentColor || '#5c54c7'}}>&nbsp;</div>
          <div className={'avatar ' + (props.currentApp.configuration.profileImage ? 'uploaded' : 'default')}
            style={props.bgImageStyle}>&nbsp;</div>
          <h3>{props.currentApp.name}</h3>
          <span>{props.currentApp.configuration.network}</span>
        </div>
        <p>This is how users see your app in their uPort mobile app.</p>
      </div>
    </Col>
  </Grid>
</div>)
