import React, {
  ChangeEventHandler,
  FocusEventHandler,
  KeyboardEventHandler,
  forwardRef,
  RefObject,
} from 'react'

import {MaskInput, Input, Value} from '../primitive'
import {MaskedInput, isMaskDigital, Mask, Pipe} from '../mask'

export interface BasicInputProps {
  value: string
  tabIndex?: number
  type?: 'text' | 'password' | 'tel' | 'number' | 'search' | 'email' | 'url'
  name?: string
  autoComplete?: boolean | string
  autoFocus?: boolean
  placeholder?: string
  inputMode?: 'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url'
  maxLength?: number
  pl?: Value
  pr?: Value
  disabled?: boolean
  error: boolean
  focused: boolean
  mask?: Mask
  pipe?: Pipe
  onChange?: ChangeEventHandler
  onFocus?: FocusEventHandler
  onBlur?: FocusEventHandler
  onKeyDown?: KeyboardEventHandler
  onKeyUp?: KeyboardEventHandler
}

export const BasicInput = forwardRef<HTMLInputElement, BasicInputProps>((props, ref) => {
  const common = {
    width: 1,
    height: 7,
    m: 0,
    p: 0,
    pr: props.pr,
    pl: props.pl,
    r: 0,
    b: 'none',
    bb: props.disabled ? '1px dotted #999' : props.error ? '2px solid #d0021b' : props.focused ? '2px solid #ff8c00' : '1px solid rgba(0, 0, 0, 0.2)',
    valueSize: 5,
    valueWeight: 300,
    valueColor: props.disabled ? '#666' : '#000',
    placeholderColor: '#666',
    cursor: props.disabled ? 'not-allowed' : 'text',
    bg: 'transparent',
    transition: 'all 100ms cubic-bezier(0.4, 0.0, 0.2, 1)',
    value: props.value,
    name: props.name,
    autoComplete: typeof props.autoComplete === 'string'
      ? props.autoComplete
      : props.autoComplete
        ? 'on'
        : 'off',
    autoFocus: props.autoFocus,
    placeholder: props.placeholder,
    inputMode: props.inputMode,
    disabled: !!props.disabled,
    maxLength: props.maxLength,
    onChange: props.onChange,
    onFocus: props.onFocus,
    onBlur: props.onBlur,
    onKeyDown: props.onKeyDown,
    onKeyUp: props.onKeyUp,
    ref: ref as RefObject<HTMLInputElement & MaskedInput>,
  }
  return (
    props.mask ? (
      <MaskInput
        {...common}
        type={props.type === undefined ? (isMaskDigital(props.mask) ? 'tel' : 'text') : (['text', 'password', 'tel'].includes(props.type) ? props.type : 'text')}
        mask={props.mask}
        pipe={props.pipe}
        guide={false}
        keepCharPositions={!!props.pipe}
        placeholderChar={'\u2000'}
      />
    ) : (
      <Input
        {...common}
        type={props.type === undefined ? 'text' : props.type}
      />
    )
  )
})

BasicInput.defaultProps = {
  tabIndex: 0,
}

export default BasicInput
