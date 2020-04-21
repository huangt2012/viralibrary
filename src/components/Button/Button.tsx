import React, { ButtonHTMLAttributes, AnchorHTMLAttributes, FC } from 'react'
import classNames from 'classnames'


export type ButtonSize = 'lg' | 'sm'
export type ButtonType = 'primary' | 'deffault' | 'danger' | 'link' | 'default'

interface BaseButtonProps {
    className?: string
    /** 设置Button是否禁用 */
    disable?: boolean
    /** 设置Button的尺寸 */
    size?: ButtonSize
    /** 设置Button的类型 */
    btnType?: ButtonType
    /** 链接Button需设置href属性，点击后跳转到对应的页面 */
    href?: string
}

type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>
type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>

// partial 可将全部属性改为可选
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>

/**
 * Button 组件
 * ## Button header
 * ~~~js
 * import { Button } from viralibrary
 * ~~~
 */
export const Button: FC<ButtonProps> = (props) => {
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

Button.defaultProps = {
    disabled: false,
    btnType: 'default'
}

export default Button;