import React, { useContext, FunctionComponentElement, useState } from 'react'
import classNames from 'classnames'
import { MenuContext } from './Menu'
import { MenuItemProps } from './MenuItem'

export interface SubMenuProps {
    index?: string
    className?: string
    title: string
}

const SubMenu: React.FC<SubMenuProps> = (props) => {
    const {
        index,
        className,
        title,
        children,
    } = props
    const context = useContext(MenuContext)
    const openSubmenus = context.defaultOpenSubmenus as string[]
    const isOpend = index && context.mode === 'vertical' ? openSubmenus.includes(index) : false
    const [menuOpen, setMenuOpen] = useState(isOpend)
    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault()
        setMenuOpen(!menuOpen)
    }
    let timer: any = null
    const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
        clearTimeout(timer)
        e.preventDefault()
        timer = setTimeout(() => {
            setMenuOpen(toggle)
        }, 300);
    }
    const clickEvents = context.mode === 'vertical' ? {
            onClick: handleClick
        } : {}
    const hoverEvents = context.mode !== 'vertical' ? {
        onMouseEnter: (e: React.MouseEvent) => { handleMouse(e, true)},
        onMouseLeave: (e: React.MouseEvent) => { handleMouse(e, false) },
    } : {}
    const renderChildren = () => {
        const childrenComponent = React.Children.map(children, (child, i) => {
            const childElement = child as FunctionComponentElement<MenuItemProps>
            if (childElement.type.displayName === 'MenuItem') {
                return React.cloneElement(childElement, {index: `${index}-${i}`})
            } else {
                console.log('Warning: SubMenu has a child which is not a MenuItem component')
            }
        })
        return (
            <ul className={classNames('vira-submenu', {
                'submenu-opend': menuOpen
            })}>
                {childrenComponent}
            </ul>
        )
    }
    return (
        <li
            key={index}
            className={classNames('menu-item', 'submenu-item', className, {
                'active': context.index === index
            })}
            {...hoverEvents}
        >
            <div className='submenu-title' {...clickEvents}>
                {title}
            </div>
            {renderChildren()}
        </li>
    )
}

SubMenu.displayName = 'SubMenu'
export default SubMenu