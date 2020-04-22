import React, { useState, FC, ChangeEvent, ReactElement, useEffect, KeyboardEvent, useRef } from 'react'
import classNames from 'classnames'
import Icon from '../Icon/Icon'
import Input, { InputProps } from '../Input/Input'
import useDebounce from '../../hooks/useDebounce'
import useClickOutside from '../../hooks/useClickOutside'
import Transition from '../Transiton/transition'

interface OptionObj {
    value: string
}
export type OptionType<T = {}> = T & OptionObj
export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
    /** 获取下拉菜单的数据 */
    fetchSuggestions: (str: string) => OptionType[] | Promise<OptionType[]>
    /** 选择热点数据后的回调 */
    onSelect: (item: OptionType) => void
    /** 自定义渲染option */
    renderOption?: (item: OptionType) => ReactElement
}

/**
 * AutoComplete 组件
 * ~~~js
 * import { AutoComplete } from viralibrary
 * ~~~
 */

export const AutoComplete: FC<AutoCompleteProps> = (props) => {
    const {
        fetchSuggestions,
        value,
        onSelect,
        renderOption,
        ...restProps
    } = props

    const [ inputValue, setInputValue ] = useState(value as string)
    const [ suggestions, setSuggestions ] = useState<OptionType[]>([])
    const [ loading, setLoading ] = useState(false)
    const [ activeIndex, setActiveIndex ] = useState(-1)
    const [ showDropdown, setShowDropdown ] = useState(false)
    const debouncedValue = useDebounce(inputValue, 500)
    const triggerSearch = useRef(false)
    const componentRef = useRef<HTMLDivElement>(null)
    useClickOutside(componentRef, () => { setShowDropdown(false) })
    useEffect(() => {
        if (debouncedValue && triggerSearch.current) {
            const results = fetchSuggestions(debouncedValue)
            if (results instanceof Promise) {
                setLoading(true)
                results.then((data) => {
                    setLoading(false)
                    setSuggestions(data)
                    if (data.length) {
                        setShowDropdown(true)
                    }
                })
            } else {
                setSuggestions(results)
                if (results.length) {
                    setShowDropdown(true)
                }
            }
        } else {
            setShowDropdown(false)
        }
        setActiveIndex(-1)
    }, [debouncedValue])
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim()
        setInputValue(value)
        triggerSearch.current = true
    }

    const handleActiveIndex = (index: number) => {
        if (index < 0) index = 0
        if (index > suggestions.length - 1) {
            index = suggestions.length - 1
        }
        const $list = document.getElementById('suggestion-list')
        const $item = document.getElementById(`suggestion-item-${index}`)
        const scrollHeight = ($item?.offsetTop || 0) -( $list?.clientHeight || 500) + ($item?.offsetHeight || 40) * 2
        $list?.scrollTo(0, scrollHeight || 0)
        setActiveIndex(index)
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        switch (e.keyCode) {
            case 13:
                // enter
                if (suggestions[activeIndex]) {
                    handleSelect(suggestions[activeIndex])
                }
                break;
            case 38: 
                // up
                handleActiveIndex(activeIndex - 1)
                break
            case 40:
                handleActiveIndex(activeIndex + 1)
                // down
                break
            case 27:
                // esc
                setShowDropdown(false)
                break
        
            default:
                break
        }
    }

    const handleSelect = (item: OptionType) => {
        setInputValue(item.value)
        setShowDropdown(false)
        if (onSelect) {
            onSelect(item)
        }
        triggerSearch.current = false
    }
    const generateDropDown = () => {
        return (
            <Transition
                in={showDropdown || loading}
                timeout={300}
                animation='zoom-in-top'
                onExited={() => { setSuggestions([]) }}
            >
                <ul className='vira-suggestion-list' id='suggestion-list'>
                    {loading && (
                        <div className='suggestion-loading-icon'>
                            <Icon icon='spinner' spin />
                        </div>
                    )}
                    {suggestions.map((item, index) => (
                        <li
                            key={index}
                            id={`suggestion-item-${index}`}
                            className={classNames('suggestion-item', {
                                'active': activeIndex === index
                            })}
                            onClick={() => { handleSelect(item) }}
                        >
                            {renderOption ? renderOption(item) : item.value}
                        </li>
                    ))}
                </ul>
            </Transition>
        )
    }
    return (
        <div className='vira-auto-complete' ref={componentRef}>
            <Input
                value={inputValue}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                {...restProps}
            />
            {generateDropDown()}
        </div>
    )
}

export default AutoComplete;