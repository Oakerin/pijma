import React, {FC} from 'react'

import {LinkControl, Value, Flex, Stub, CardLnk} from '@qiwi/pijma-core'

export interface PaginationLinkProps {
  page: number
  disabled: boolean
  width?: Value
  href?: string
  shadowed?: boolean
  stub?: boolean
  onClick?: (href?: string, target?: string, download?: string | boolean, rel?: string) => void
  children: FC<{
    disabled: boolean
    hover: boolean
    focus: boolean
  }>
}

export const PaginationLink: FC<PaginationLinkProps> = props => (
  <LinkControl
    href={props.stub ? undefined : props.href}
    onClick={props.stub ? undefined : props.onClick}
    children={renderProps => (
      <CardLnk
        as={props.stub ? 'div' : 'a'}
        transition="all 100ms cubic-bezier(0.4, 0.0, 0.2, 1)"
        height={12}
        width={props.width}
        display="inline-flex"
        cursor={props.stub || props.disabled ? 'default' : 'pointer'}
        bg={(renderProps.hover || renderProps.focus) && !props.disabled ? '#f5f5f5' : undefined}
        s={
          (renderProps.hover || renderProps.focus) && !props.disabled
            ? props.shadowed ? 'inset 0 1px 0 0 #e6e6e6, 0 -1px 0 1px #e6e6e6' : '0px -1px 0 1px #e6e6e6'
            : '1px 0 0 #e6e6e6'
        }
        href={props.stub ? undefined : props.href}
        onClick={props.stub ? undefined : renderProps.onClick}
        onFocus={props.stub ? undefined : renderProps.onFocus}
        onBlur={props.stub ? undefined : renderProps.onBlur}
        onMouseEnter={props.stub ? undefined : renderProps.onMouseEnter}
        onMouseLeave={props.stub ? undefined : renderProps.onMouseLeave}
        onMouseUp={props.stub ? undefined : renderProps.onMouseUp}
        onMouseDown={props.stub ? undefined : renderProps.onMouseDown}
      >
        <Flex
          align="center"
          justify="center"
          width={1}
          height={1}
          children={props.stub ? (
            <Stub
              height={6}
              width={6}
              r={12}
            />
          ) : (
            props.children({
              disabled: props.disabled || false,
              hover: renderProps.hover,
              focus: renderProps.focus,
            })
          )}
        />
      </CardLnk>
    )}
  />
)

PaginationLink.defaultProps = {
  width: 12,
  shadowed: false,
}
