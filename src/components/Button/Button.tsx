import React from 'react'
import classNames from 'classnames'


export type ButtonSize = 'lg' | 'sm'
export type ButtonType = 'primary' | 'deffault' | 'danger' | 'link'

interface BaseButtonProps {
    className?: string
    disable?: boolean
    size?: ButtonSize
    btnType?: ButtonType
    href?: string
}

type NativeButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLElement>
type AnchorButtonProps = BaseButtonProps & React.AnchorHTMLAttributes<HTMLElement>

// partial 可将全部属性改为可选
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>

const Button: React.FC<ButtonProps> = (props) => {
    const { 
        className, 
        disable, 
        size, 
        btnType = 'default', 
        children, 
        href,
        ...restProps // 初上面之外的其他属性
    } = props
    const classes = classNames('btn', className, {
        [`btn-${btnType}`]: btnType,
        [`btn-${size}`]: size,
        'disabled': btnType === 'link' && disable
    })
    if (btnType === 'link' && href) {
        return (
            <a
                className={classes}
                href={href}
                {...restProps}
            >{children}</a>
        )
    }
    return (
        <button
            className={classes}
            disabled={disable}
            {...restProps}
        >
            {children}
        </button>
    )
}

export default Button