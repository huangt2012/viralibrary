import React, { useContext, FunctionComponentElement, useState } from 'react'
import classNames from 'classnames'
import { MenuContext } from './Menu'
import { MenuItemProps } from './MenuItem'
import Transition from '../Transiton/transition'
import Icon from '../Icon/Icon'

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
            <Transition
                in={menuOpen}
                timeout={300}
                animation='zoom-in-top'
            >
                <ul className='vira-submenu'>
                    {childrenComponent}
                </ul>
            </Transition>
        )
    }
    return (
        <li
            key={index}
            className={classNames('menu-item', 'submenu-item', className, {
                'active': context.index === index,
                'is-opened': menuOpen,
                'is-vertical': context.mode === 'vertical'
            })}
            {...hoverEvents}
        >
            <div className='submenu-title' {...clickEvents}>
                {title}
                <Icon icon='angle-down' className='arrow-icon' />
            </div>
            {renderChildren()}
        </li>
    )
}

SubMenu.displayName = 'SubMenu'
export default SubMenu