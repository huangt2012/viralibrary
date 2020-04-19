import React from 'react'
import { render, RenderResult, fireEvent, cleanup } from '@testing-library/react'
import Menu, { MenuProps } from './Menu'
import MenuItem from './MenuItem'

const testProps: MenuProps = {
    defaultIndex: 0,
    onSelect: jest.fn(),
    className: 'test'
}

const testVerProps: MenuProps =  {
    defaultIndex: 0,
    mode: 'vertical'
}

const generateMenu = (props: MenuProps) => {
    return (
        <Menu {...props}>
            <MenuItem >
                active
            </MenuItem>
            <MenuItem  disabled>
                disabled
            </MenuItem>
            <MenuItem>
                xyz
            </MenuItem>
        </Menu>
    )
}

let wrapper: RenderResult, menuElement: HTMLElement, activeElement: HTMLElement, disableElement: HTMLElement

describe('测试Menu以及MenuItem', () => {
    beforeEach(() => {
        wrapper = render(generateMenu(testProps))
        menuElement = wrapper.getByTestId('test-menu')
        activeElement = wrapper.getByText('active')
        disableElement = wrapper.getByText('disabled')
    })
    it('是否正确渲染默认的组件', () => {
        expect(menuElement).toBeInTheDocument()
        expect(menuElement).toHaveClass('vira-menu test')
        expect(menuElement.getElementsByTagName('LI').length).toEqual(3)
        expect(activeElement).toHaveClass('menu-item active')
        expect(disableElement).toHaveClass('menu-item disabled')
    })
    it('点击item时需要设置对应的active以及调用回调函数', () => {
        const thirdItem = wrapper.getByText('xyz')
        fireEvent.click(thirdItem)
        expect(thirdItem).toHaveClass('active')
        expect(activeElement).not.toHaveClass('active')
        expect(testProps.onSelect).toHaveBeenCalledWith(2)
        fireEvent.click(disableElement)
        expect(disableElement).not.toHaveClass('active')
        expect(testProps.onSelect).not.toHaveBeenCalledWith(1)
    })
    it('当mode为vertical时需要渲染对应的menu', () => {
        cleanup()
        const wrapper = render(generateMenu(testVerProps))
        const menuElement = wrapper.getByTestId('test-menu')
        expect(menuElement).toHaveClass('menu-vertical')
    })
})