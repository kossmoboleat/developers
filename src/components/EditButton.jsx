import React, { Component } from 'react'
import styled from 'styled-components'

import { medium } from '../layouts/grid';
import githubIcon from '../images/github-icon-gray.svg'
import githubIconHover from '../images/github-icon-white.svg'

const EditButton = props => (
  <EditLink href={props.to} target='_blank'>
    <Icon />
    Edit
  </EditLink>
);

const Icon = styled.div`
  background: url(${githubIcon}) center no-repeat;
  display: inline-block;
  height: 24px;
  margin-right: 5px;
  width: 24px;
`;
const EditLink = styled.a`
  align-items: center;
  border: solid 1px #5F5D68;
  border-radius: 3px;
  color: #5F5D68;
  font-size: 0.875rem;
  display: flex;
  padding: 5px;
  text-decoration: none;
  transition: all .1s ease;
  width: 5em;
  ${medium(`margin-top: 60px;`)}

  &:hover {
    color: #fff;
    background: #5F5D68;

    ${Icon} {
      background: url(${githubIconHover}) center no-repeat;
    }
  }
`

export default EditButton
