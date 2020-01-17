import React from 'react'
import styled from 'styled-components'

const Container = styled.a.attrs(({}) => ({
  className: '',
}))`
font-family:  ${props => props.theme.typography.buttonFontFamily};
    display: block;
    width: 300px;
    height: 75px;
    line-height: 75px; 
    display:inline-block;
    color: #fff;
    position: relative;
    cursor: pointer;
    overflow: hidden;
    border-radius: 5px;
    box-shadow: ${props => props.shadow};
    transition: all 0.25s cubic-bezier(0.31, -0.105, 0.43, 1.4);;

    &.primary {
      border:1px solid ${props => props.theme.buttonColors.success};
      background-color: ${props => props.theme.buttonColors.success};

      &:hover {
        background-color: ${props => props.theme.buttonColors.success};
      }
      

      span {
        &:after {
          background-color: ${props => props.theme.buttonColors.successDark};
        }
      }
    }

    &.secondary {
      border:1px solid ${props => props.theme.buttonColors.delete};
      background-color: ${props => props.theme.buttonColors.delete};

      &:hover {
        background-color: ${props => props.theme.buttonColors.delete};
      }
      
      span {
        &:after {
          background-color: ${props => props.theme.buttonColors.deleteDark};
        }
      }
    }

    span,
    .icon {
      display: block;
      height: 100%;
      text-align: center;
      position: absolute;
      top: 0;
    }

    span {
      width: 72%;
      line-height: inherit;
      font-size: 22px;
      text-transform: uppercase;
      left: 0;
      transition: all 0.25s cubic-bezier(0.31, -0.105, 0.43, 1.4);;

      &:after {
        content: '';
        width: 2px;
        height: 70%;
        position: absolute;
        top: 15%;
        right: -1px;
      }
    }

    .icon {
      width: 28%;
      right: 0;
      transition: all 0.25s cubic-bezier(0.31, -0.105, 0.43, 1.4);;

      .fa {
        font-size: 30px;
        vertical-align: middle;
        transition: all 0.25s cubic-bezier(0.31, -0.105, 0.43, 1.4);, height #{$speed} ease;
      }

      .icon-1 {
        height: 36px;
      }

      .icon-2 {
        display: none;
      }
    }

    &.success,
    &:hover {
      span {
        left: -72%;
        opacity: 0;
      }

      .icon {
        width: 100%;

        .fa {
          font-size: 45px;
        }
      }
    }

    &.success {
      background-color: #27ae60;

      .icon {
        .icon-1 {
          display: none;
        }

        .icon-2 {
          display: inline-block;
        }
      }
    }

    &:hover {
      opacity: 0.9;

      .icon .icon-1 {
        height: 46px;
      }
    }

    &:active {
      opacity: 1;
    }
`

export const Button = props => {
  const { children, active, onClick, type, defaultIcon, successIcon } = props

  return (
    <Container className={active ? type + ' success' : type} onClick={onClick}>
      <span>{children}</span>
      <div className="icon">
        <i className={defaultIcon ? 'icon-1 ' + defaultIcon : 'fa icon-1 fa-remove'}></i>
        <i className={successIcon ? 'icon-2 ' + successIcon : 'fa icon-2 fa-check'}></i>
      </div>
    </Container>
  )
}

export default Button
