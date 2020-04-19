import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Button, { ButtonProps } from './Button'

const defaultProps = {
    onClick: jest.fn()
}

const testProps: ButtonProps = {
    btnType: 'primary',
    size: 'lg',
    className: 'class'
}

const disableProps: ButtonProps = {
    disable: true,
    onClick: jest.fn()
}


describe('test Button Component', () => {
    it('should render the correct default button', () => {
        const wrapper = render(<Button {...defaultProps}>nick</Button>)
        const element = wrapper.getByText('nick') as HTMLButtonElement
        expect(element).toBeInTheDocument()
        expect(element.tagName).toEqual('BUTTON')
        expect(element).toHaveClass('btn btn-default')
        fireEvent.click(element)
        expect(defaultProps.onClick).toHaveBeenCalled()
        expect(element.disabled).toBeFalsy()
    })
    it('should render the correct component base on different props', () => {
        const wrapper = render(<Button {...testProps}>nick</Button>)
        const element = wrapper.getByText('nick')
        expect(element).toBeInTheDocument()
        expect(element).toHaveClass('btn-primary btn-lg class')
    })
    it('should render a link when btnType equals link and href is provided', () => {
        const wrapper = render(<Button btnType='link' href='https://baidu'>link</Button>)
        const element = wrapper.getByText('link')
        expect(element).toBeInTheDocument()
        expect(element.tagName).toEqual('A')
        expect(element).toHaveClass('btn btn-link')
    })
    it('should render a diabled button when disable is set to true', () => {
        const wrapper = render(<Button {...disableProps}>nick</Button>) 
        const element = wrapper.getByText('nick') as HTMLButtonElement
        expect(element).toBeInTheDocument()
        expect(element.disabled).toBeTruthy()
        fireEvent.click(element)
        expect(disableProps.onClick).not.toHaveBeenCalled()
    })
})