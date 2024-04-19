import styled, { css } from 'styled-components'

import { ArrowProps } from './index'

export const arrowModifiers = {
  right: () => css`
    transform: rotate(-45deg);
    margin: 0px 0px 0px 20px;
  `,
  left: () => css`
    transform: rotate(135deg);
  `,
  up: () => css`
    transform: rotate(-135deg);
    margin: 0px 15px -4px 21px;
  `,
  down: () => css`
    transform: rotate(45deg);
    margin: 0px 15px 2px 21px;
  `,
  unsorted: () => css``
}

export const I = styled.i<ArrowProps>`
  ${({ direction, theme, source }) => css`
    cursor: pointer;
    border: solid ${theme.colors.base.lightPure};
    border-width: 0 2px 2px 0;
    display: inline-block;
    padding: 3px;

    ${direction && arrowModifiers[direction]()};
    ${source === 'Accordion' &&
    css`
      border-width: 0 3px 3px 0;
      padding: 4px;
    `}
  `}
`

export const IconWrapper = styled.div`
  margin: 7px 15px 0px 20px;
  cursor: pointer;
`
