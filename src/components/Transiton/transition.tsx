import React from 'react'
import { CSSTransition } from 'react-transition-group'
import { CSSTransitionProps } from 'react-transition-group/CSSTransition'

type AnimationName = 'zoom-in-top' | 'zoom-in-left' | 'zoom-in-bottom' | 'zoom-in-right'
type TransitionProps = CSSTransitionProps & {
    animation?: AnimationName
    wrapper?: boolean
}

const Transition: React.FC<TransitionProps> = (props) => {
    const { 
        animation,
        wrapper,
        children,
        classNames,
        ...restProps
    } = props
    return (
        <CSSTransition
            classNames={classNames || animation}
            {...restProps}
        >
            {/* 避免当childre也有transiton属性时，会覆盖 */}
            {wrapper ? <div>{children}</div> : children}
        </CSSTransition>
    )
}

Transition.defaultProps = {
    unmountOnExit: true,
    appear: true,
    timeout: 300
}

export default Transition