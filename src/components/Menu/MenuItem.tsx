import React, { useContext } from 'react'
import classNames from 'classnames'
import { MenuContext } from './Menu'

export interface MenuItemProps {
    index?: number
    className?: string
    disabled?: boolean
    style?: React.CSSProperties
}

const MenuItem: React.FC<MenuItemProps> = (props) => {
    const {
        index,
        className,
        disabled,
        style,
        children
    } = props
    const context = useContext(MenuContext)
    const handleClick = () => {
        if (context.onSelect && !disabled && typeof(index) === 'number') {
            context.onSelect(index)
        }
    }
    return (
        <li
            className={classNames('menu-item', className, {
                'disabled': disabled,
                'active': context.index === index
            })}
            style={style}
            onClick={handleClick}
        >
            {children}
        </li>
    )
}

MenuItem.displayName = 'MenuItem'
export default MenuItem