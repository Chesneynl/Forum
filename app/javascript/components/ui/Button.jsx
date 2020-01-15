import React from 'react'
import styled from 'styled-components'

removeSuccess = ->
    $('.button').removeClass 'success'

$(document).ready ->
    $('.button').click ->
        $(@).addClass 'success'
        setTimeout removeSuccess, 3000

const Container = styled.a`
    display: block;
    background-color: #c0392b;
    width: 300px;
    height: 100px;
    line-height: 100px;
    margin: auto;
    color: #fff;
    position: relative;
    cursor: pointer;
    overflow: hidden;
    border-radius: 5px;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.3);
    transition: all 0.25s cubic-bezier(0.31, -0.105, 0.43, 1.4);;

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
        background-color: #a53125;
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

      .fa-remove {
        height: 36px;
      }

      .fa-check {
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
        .fa-remove {
          display: none;
        }

        .fa-check {
          display: inline-block;
        }
      }
    }

    &:hover {
      opacity: 0.9;

      .icon .fa-remove {
        height: 46px;
      }
    }

    &:active {
      opacity: 1;
    }
`

export const Button = props => {
  const { children } = props

  return (
    <Container>
      <span>{children}</span>
      <div class="icon">
        <i class="fa fa-remove">X</i>
        <i class="fa fa-check">X</i>
      </div>
    </Container>
  )
}

export default Button
