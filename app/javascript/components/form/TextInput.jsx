import React, { useState } from 'react'
import styled from 'styled-components'
import { InputRow } from './InputRow'

const InputField = styled.input`
  display: block;
  width: 100%;
  height: 34px;
  padding: 6px 12px;
  font-size: 14px;
  line-height: 1.42857143;
  color: #555555;
  line-height: 34px;
  background-color: #ffffff;
  background-image: none;
  border: 1px solid #cccccc;
  border-radius: 4px;
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  -webkit-transition: border-color ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;
  -o-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;

  &:focus {
    border-color: #66afe9;
    outline: 0;
    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(102, 175, 233, 0.6);
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(102, 175, 233, 0.6);
  }

  &::-moz-placeholder,
  &:-ms-input-placeholder,
  &::-webkit-input-placeholder {
    color: #999999;
    opacity: 1;
  }
`

const ErrorMessage = styled.div`
  color: red;
`

export const TextInput = props => {
  const { type, name, placeholder, value, onChange, error } = props

  return (
    <InputRow>
      <InputField
        placeholder={placeholder}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
      />
      {error ? <ErrorMessage>{error}</ErrorMessage> : null}
    </InputRow>
  )
}

export default TextInput
