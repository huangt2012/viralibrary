import React from 'react'
import { render, RenderResult, fireEvent, cleanup, wait } from '@testing-library/react'
import Menu, { MenuProps } from './Menu'
import MenuItem from './MenuItem'
import SubMenu from './SubMenu'

const testProps: MenuProps = {
    defaultIndex: '0',
    onSelect: jest.fn(),
    className: 'test'
}

const testVerProps: MenuProps =  {
    defaultIndex: '0',
    mode: 'vertical',
    defaultOpenSubmenus: ['4']
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
            <SubMenu title='dropdown'>
                <MenuItem>drop 1</MenuItem>
            </SubMenu>
            <SubMenu title="opened">
                <MenuItem>
                    opened1
                </MenuItem>
            </SubMenu>
        </Menu>
    )
}
const createCssFile = () => {
    const cssFile: string = `
        .vira-submenu {
            display: none;
        }
        .vira-submenu.submenu-opend {
            display: block
        }
    `
    const style = document.createElement('style')
    style.type = 'text/css'
    style.innerHTML = cssFile
    return style
}

let wrapper: RenderResult, wrapper2: RenderResult, menuElement: HTMLElement, activeElement: HTMLElement, disableElement: HTMLElement

describe('测试Menu以及MenuItem', () => {
    beforeEach(() => {
        wrapper = render(generateMenu(testProps))
        wrapper.container.appendChild(createCssFile())
        menuElement = wrapper.getByTestId('test-menu')
        activeElement = wrapper.getByText('active')
        disableElement = wrapper.getByText('disabled')
    })
    it('是否正确渲染默认的组件', () => {
        expect(menuElement).toBeInTheDocument()
        expect(menuElement).toHaveClass('vira-menu test')
        expect(menuElement.querySelectorAll(':scope > li').length).toEqual(5)
        expect(activeElement).toHaveClass('menu-item active')
        expect(disableElement).toHaveClass('menu-item disabled')
    })
    it('点击item时需要设置对应的active以及调用回调函数', () => {
        const thirdItem = wrapper.getByText('xyz')
        fireEvent.click(thirdItem)
        expect(thirdItem).toHaveClass('active')
        expect(activeElement).not.toHaveClass('active')
        expect(testProps.onSelect).toHaveBeenCalledWith('2')
        fireEvent.click(disableElement)
        expect(disableElement).not.toHaveClass('active')
        expect(testProps.onSelect).not.toHaveBeenCalledWith('1')
    })
    it('鼠标hover时显示下拉菜单', async () => {
        expect(wrapper.queryByText('drop 1')).not.toBeVisible()
        const dropdownElement = wrapper.getByText('dropdown')
        fireEvent.mouseEnter(dropdownElement)
        await wait(() => {
            expect(wrapper.queryByText('drop 1')).toBeVisible()
        })
        fireEvent.click(wrapper.getByText('drop 1'))
        expect(testProps.onSelect).toHaveBeenCalledWith('3-0')
        fireEvent.mouseLeave(dropdownElement)
        await wait(() => {
            expect(wrapper.queryByText('drop 1')).not.toBeVisible()
        })
    })
    
})

describe('测试纵向下拉菜单', () => {
    beforeEach(() => {
        wrapper2 = render(generateMenu(testVerProps))
        wrapper2.container.appendChild(createCssFile())
    })
    it('当mode为vertical时渲染对应的menu', () => {
        const menuElement = wrapper2.getByTestId('test-menu')
        expect(menuElement).toHaveClass('menu-vertical')
    })
    it('点击下拉菜单时，显示子菜单', () => {
        const dropdownElement = wrapper2.queryByText('drop 1')
        expect(dropdownElement).not.toBeVisible()
        fireEvent.click(wrapper2.getByText('dropdown'))
        expect(dropdownElement).toBeVisible()
    })
    it('测试默认展开子菜单', () => {
        expect(wrapper2.queryByText('opened1')).toBeVisible()
    })
})