import React from 'react'
import classNames from 'classnames'
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome'

export type IconTheme = "primary" | "secondary" | "success" | "info" | "warning" | "danger" | "light" | "dark"

interface IconProps extends FontAwesomeIconProps {
    theme?: IconTheme
    
}

const Icon: React.FC<IconProps> = (props) => {
    const { className, theme, ...restProps } = props
    return (
        <FontAwesomeIcon
            className={classNames('vira-icon', className, {
                [`icon-${theme}`]: theme
            })}
            {...restProps}
        />
    )
}

export default Icon
