import styled from 'styled-components'
import tick from '../../../images/blue-tick.svg'

export default styled.ul`
  list-style: none;
  margin: 0 0 10px 0;
  padding: 0;

  li {
    margin: 0 0 20px;
    padding-left: 20px;
    position: relative;
  }
  li::before {
    background-image: url(${tick});
    background-position: 0 2px;
    background-repeat: no-repeat;
    background-size: contain;
    content: "";
    color: #62b482;
    height: 20px;
    left: -10px;
    text-align: center;
    width: 20px;
    position:absolute;
    top: 0;
  }
`
