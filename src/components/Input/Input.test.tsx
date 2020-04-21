import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import Input, { InputProps } from './Input'

const defaultProps: InputProps = {
    onChange: jest.fn(),
    placeholder: 'test-input'
}

describe('Input 组件测试', () => {
    it('是否正常渲染组件', () => {
        const wrapper = render(<Input {...defaultProps} />)
        const testNode = wrapper.getByPlaceholderText('test-input') as HTMLInputElement
        expect(testNode).toBeInTheDocument()
        expect(testNode).toHaveClass('vira-input-inner')
        fireEvent.change(testNode, { target: { value: '23' }})
        expect(defaultProps.onChange).toHaveBeenCalled()
        expect(testNode.value).toEqual('23')
    })
})