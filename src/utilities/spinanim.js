import { css, keyframes } from 'styled-components'

const spin = keyframes`
  from {
    transform:rotate(0deg);
  }
  to {
    transform:rotate(360deg);
  }
`

export default props => css`
  animation: ${spin} 2s linear infinite;
`
