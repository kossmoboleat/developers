import React, {Component} from 'react'
import {FaGithubAlt, FaTwitter} from 'react-icons/lib/fa'
import {MdMessage, MdEmail} from 'react-icons/lib/md'
import { Link } from 'gatsby'
import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    max-width: 100%;
`

const UserIcon = styled(Link)`
  margin-left: 25px;
  color: white;
  &:hover {
    color: rgba(0, 0, 0, .2);
    border-bottom: none;
  }
`

const iconStyle = {
  width: '20px',
  height: '20px',
}

class UserLinks extends Component {
  render() {
    return (
      <Container className="user-links">
        <UserIcon to='https://github.com/uport-project'>
          <FaGithubAlt style={iconStyle} />
        </UserIcon>
        <UserIcon to='https://twitter.com/uport_me?lang=en'>
          <FaTwitter style={iconStyle} />
        </UserIcon>
        <UserIcon to="mailto:developer@uport.me">
          <MdEmail style={iconStyle} />
        </UserIcon>
      </Container>
    )
  }
}

export default UserLinks
