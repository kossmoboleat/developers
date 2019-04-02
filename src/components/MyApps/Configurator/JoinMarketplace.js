import React, {Component} from 'react'
import styled from 'styled-components'
import ServerLanding from '../components/server/ServerLanding';
import WebThreeLanding from '../components/web3/WebThreeLanding.js'

class JoinMarketplace extends Component {

  render() {
    return (
      <SolutionsWrapper>
        <div className='solutions-grid'>
          <h2 className='solutions-grid-header'>Build with uPort for different application types</h2>
          <WebThreeLanding />
          <ServerLanding />
        </div>
      </SolutionsWrapper>
    )
  }
}

export default JoinMarketplace

const SolutionsWrapper = styled.div`
  overflow: hidden;
  position: relative;

  .solutions-grid {
    display: grid;
    grid-template-columns: auto;
    grid-template-rows: auto;
    grid-gap: 50px;
    padding-top: 100px;
    padding-top: 45vh;
    margin-bottom: 10px;
    position: relative;
    z-index: 4;
  }
  .solutions-grid-header {
    padding: 0 20px;
    text-align: center;
  }
`
