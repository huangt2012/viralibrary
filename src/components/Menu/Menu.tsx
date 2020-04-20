import React, { createContext, useState } from 'react'
import classNames from 'classnames'
import { MenuItemProps } from './MenuItem'

export type MenuMode = 'horizontal' | 'vertical'
export type SelectCallback = (selectedIndex: string) => void
export interface MenuProps {
    defaultIndex?: string
    className?: string
    mode?: MenuMode
    style?: React.CSSProperties
    onSelect?: SelectCallback
    defaultOpenSubmenus?: string[]
}
interface IMenuContext {
    index: string
    onSelect?: SelectCallback
    mode?: MenuMode
    defaultOpenSubmenus?: string[]
}
export const MenuContext = createContext<IMenuContext>({ index: '0' })
const Menu: React.FC<MenuProps> = (props) => {
    const {
        defaultIndex,
        className,
        mode,
        style,
        children,
        defaultOpenSubmenus,
        onSelect
    } = props
    const [currentActive, setActive] = useState(defaultIndex)
    const handleClick = (index: string) => {
        setActive(index)
        if (onSelect) {
            onSelect(index)
        }
    }
    const renderChildren = () => {
        return React.Children.map(children, (child, index) => {
            const childElement = child as React.FunctionComponentElement<MenuItemProps>
            const { displayName } = childElement.type
            if (displayName === 'MenuItem' || displayName === 'SubMenu') {
                return React.cloneElement(childElement, { index: index.toString() })
            } else {
                console.log('Warning: Menu has a child which is not a MenuItem Component')
            }
        })
    }
    return (
        <ul
            className={classNames('vira-menu', className, {
                'menu-vertical': mode === 'vertical',
                'menu-horizontal': mode !== 'vertical'
            })}
            style={style}
            data-testid='test-menu'
        >
            <MenuContext.Provider value={{
                index: currentActive || '0',
                onSelect: handleClick,
                mode,
                defaultOpenSubmenus
            }}>
                {renderChildren()}
            </MenuContext.Provider>
        </ul>
    )
}

Menu.defaultProps = {
    defaultIndex: '0',
    mode: 'horizontal',
    defaultOpenSubmenus: []
}

export default Menu