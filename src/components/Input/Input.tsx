import React, { ReactElement, InputHTMLAttributes, FC, ChangeEvent } from 'react'
import classNames from 'classnames'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import Icon from '../Icon/Icon'

type InputSize = 'lg' | 'sm'
export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size' | 'prefix'> {
    /** 是否禁用状态 */
    disabled?: boolean
    /** 设置input大小 */
    size?: InputSize
    /** 添加图标，在右侧悬浮添加一个图标，用于提示 */
    icon?: IconProp
    /** 添加前缀 用于配置一些固定组合 */
    prefix?: string | ReactElement
    /** 添加后缀 用于配置一些固定组合 */
    suffix?: string | ReactElement
    /** 输入后回调 */
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

/**
 * Input 输入框 通过鼠标或键盘输入内容，是最基础的表单域的包装。
 *  * ~~~js
 * // 引用
 * import { Input } from 'viralibrary'
 * ~~~
 * 支持 HTMLInput 的所有基本属性
 */
const Input: FC<InputProps> = (props) => {
    const {
        disabled,
        size,
        icon,
        prefix,
        suffix,
        style,
        ...restProps
     } = props
    const fixControlledValue = (value: any) => {
        if (typeof value === 'undefined' || value === null) {
            return ''
        }
        return value
    }
    if ('value' in props) {
        delete restProps.defaultValue
        restProps.value = fixControlledValue(props.value)
    }
     return (
         <div
            className={classNames('vira-input-wrapper', {
                [`input-size-${size}`]: size,
                'input-group': prefix || suffix,
                'input-group-prefix': !!prefix,
                'input-group-suffix': !!suffix
            })}
            style={style}
         >
             {prefix && (
                 <div className='vira-input-group-prefix'>{prefix}</div>
             )}
             {icon && (
                 <div className='vira-input-icon-wrapper'>
                     <Icon icon={icon} title={`title-${icon}`} />
                 </div>
             )}
             <input
                className='vira-input-inner'
                disabled={disabled}
                {...restProps}
            />
             {suffix && (
                 <div className='vira-input-group-suffix'>{suffix}</div>
             )}
         </div>
     )
}

Input.defaultProps = {
    disabled: false
}
export default Input;