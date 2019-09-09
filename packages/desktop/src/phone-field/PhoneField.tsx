import React, {FunctionComponent} from 'react'

import {
  PhoneFieldControl,
  InputField,
  BasicInput,
  Stub,
  Box,
  Pos,
  Card,
  Flex,
  FlexItem,
  Flag,
} from '@qiwi/pijma-core'

import {Paragraph} from '../typography'
import {DropDown} from '../drop-down'
import PhoneFieldProps from './PhoneFieldProps'

export const PhoneField: FunctionComponent<PhoneFieldProps> = ({
  tabIndex = 0,
  countryFallback = {
    name: 'Россия',
    code: 'RU',
    mask: '+7dddddddddd',
  },
  ...props
}) => {
  if (props.stub) {
    return (
      <Box>
        {props.title ? (
          <Stub width={15} height={2} top={1} bottom={1}/>
        ) : (
          <Box height={4}/>
        )}
        <Card bb="1px solid rgba(0, 0, 0, 0.2)" height={7}>
          <Flex align="center" justify="space-between" height={1}>
            <FlexItem shrink={1} mr={3}>
              <Stub width={6} height={4} top={1} bottom={1} r={0}/>
            </FlexItem>
            <FlexItem grow={1}>
              <Stub width={38} height={3} top={1} bottom={1}/>
            </FlexItem>
            {props.hint ? (
              <FlexItem>
                <Stub width={5} height={5} r={10}/>
              </FlexItem>
            ) : (
              null
            )}
          </Flex>
        </Card>
        {props.help ? (
          <Stub width={15} height={2} top={2} bottom={1}/>
        ) : (
          <Box height={5}/>
        )}
      </Box>
    )
  }
  return (
    <PhoneFieldControl
      value={props.value}
      countries={props.countries}
      countryFallback={countryFallback}
      hideOnBlur={true}
      onChange={props.onChange}
      onFocus={props.onFocus}
      onBlur={props.onBlur}
      children={(renderProps) => (
        <Pos type="relative" ref={renderProps.containerRef}>
          <InputField
            title={props.title}
            active={renderProps.focused || !!props.value || !!props.placeholder}
            padded={!!props.hint}
            input={(
              <BasicInput
                ref={renderProps.inputRef}
                type="tel"
                value={renderProps.value.phoneNumber}
                name={props.name}
                mask={renderProps.mask}
                autoComplete={props.autoComplete}
                autoFocus={props.autoFocus}
                placeholder={props.placeholder}
                disabled={props.disabled}
                pr={props.hint ? 7 : undefined}
                pl={9}
                error={!!props.error}
                focused={renderProps.focused}
                maxLength={props.maxLength}
                onChange={renderProps.onChange}
                onFocus={renderProps.onFocus}
                onBlur={renderProps.onBlur}
                onKeyDown={renderProps.onKeyDown}
              />
            )}
            hint={props.hint}
            icon={(
              <Box
                cursor="pointer"
                width={6}
                height={4}
                my={1}
                onMouseUp={renderProps.onFlagMouseUp}
                onMouseDown={renderProps.onFlagMouseDown}
                children={(<Flag code={renderProps.country.code}/>)}
              />
            )}
            error={props.error}
            help={props.help}
            action={props.action}
          />
          <DropDown
            offset={4}
            container={renderProps.containerRef.current}
            target={renderProps.inputRef.current!}
            show={renderProps.showCountries}
            onHide={() => renderProps.onCountriesHide()}
          >
            <Card
              ref={renderProps.dropdownRef}
              s="0 28px 52px 0 rgba(0, 0, 0, 0.16)"
              bg="#fff"
              r={10}
              py={3}
              minWidth={1}
              maxHeight={110}
              overflow="auto"
              mx={-6}
            >
              {renderProps.countries.map((country, index) => (
                <Card
                  key={index}
                  ref={country.ref}
                  px={6}
                  cursor="pointer"
                  onClick={country.onClick}
                  onMouseEnter={country.onMouseEnter}
                  onMouseLeave={country.onMouseLeave}
                  bg={country.current ?
                    '#E6E6E6' : country.selected ?
                    '#F5F5F5' : '#FFF'
                  }
                >
                  <Flex py={3} align="center" wrap="nowrap">
                    <FlexItem shrink={0} mr={3}>
                      <Box width={6} height={4} my={1}>
                        <Flag code={country.code}/>
                      </Box>
                    </FlexItem>
                    <FlexItem width={16} shrink={0}>
                      <Paragraph bold>
                        {`+${country.mask.replace(/\D/g, '')}`}
                      </Paragraph>
                    </FlexItem>
                    <FlexItem shrink={0}>
                      <Paragraph bold>
                        {country.name}
                      </Paragraph>
                    </FlexItem>
                  </Flex>
                </Card>
              ))}
            </Card>
          </DropDown>
        </Pos>
      )}
    />
  )
}

PhoneField.defaultProps = {
  tabIndex: 0,
  countryFallback: {
    name: 'Россия',
    code: 'RU',
    mask: '+7dddddddddd',
  },
}
