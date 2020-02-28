import React from 'react'
import styled from 'styled-components'
import { InputRow, InputErrorMessage } from './'
import { classNames } from 'helpers/classNames'

const InputField = styled.input.attrs(({ error }) => ({
  className: classNames({
    error,
  }),
}))`
  font-size: ${props => props.theme.typography.fontSizes.medium};
  display: block;
  width: 100%;
  outline: 0;
  line-height: ${props => props.theme.typography.lineHeights.small};
  padding: ${props => props.theme.gutters.small} ${props => props.theme.gutters.medium};
  background: #fff;
  border: 1px solid ${props => props.theme.form.borderColor};
  color: rgba(0, 0, 0, 0.87);
  border-radius: 3px;
  transition: box-shadow 0.1s ease, border-color 0.1s ease;

  &.error {
    background-color: #fff6f6;
    border-color: #e0b4b4;
    color: #a9706f;

    ::placeholder {
      color: rgba(159, 58, 56, 0.3);
    }

    &:focus {
      ::placeholder {
        color: rgba(0, 0, 0, 0.3);
      }
    }
  }

  ::placeholder {
    color: rgba(0, 0, 0, 0.3);
  }

  &:focus {
    border-color: ${props => props.theme.form.focusBorderColor};
    background: #fff;
    color: rgba(0, 0, 0, 0.8);
  }
`

export const TextInput = props => {
  const { type, name, placeholder, value, onChange, error } = props

  return (
    <InputRow>
      <InputField
        placeholder={placeholder}
        type={type}
        name={name}
        error={error}
        value={value}
        onChange={onChange}
      />
      {error ? <InputErrorMessage>{error}</InputErrorMessage> : null}
    </InputRow>
  )
}

export default TextInput
