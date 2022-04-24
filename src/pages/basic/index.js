import React, { Component } from 'react'
import Example from './example'
import UncontrolledInput from './UncontrolledInput'
export default class Basic extends Component {
  render() {
    return (
      <Example title='Basic form elements'>
        <UncontrolledInput />

      </Example>
    );
  }
}
