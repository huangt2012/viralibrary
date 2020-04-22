import React, { FC } from 'react'
import { IconTheme } from '../Icon/Icon'
export interface ProgressProps {
    /** 当前进度 */
    percent: number
    /** 进度条轨迹高度 */
    strokeHeight?: number
    /** 是否显示文本 */
    showText?: boolean
    styles?: React.CSSProperties
    theme?: IconTheme
}

/**
 * Progress 组件
 * ~~~js
 * import { Progress } from viralibrary
 * ~~~
 */

const Progress: FC<ProgressProps> = (props) => {
    const {
        percent,
        strokeHeight,
        showText,
        styles,
        theme,
    } = props
    return (
        <div className="vira-progress-bar" style={styles}>
            <div className="vira-progress-bar-outer" style={{ height: `${strokeHeight}px` }}>
                <div
                    className={`vira-progress-bar-inner color-${theme}`}
                    style={{ width: `${percent}%` }}
                >
                    {showText && <span className="inner-text">{`${percent}%`}</span>}
                </div>
            </div>
        </div>
    )
}

Progress.defaultProps = {
    strokeHeight: 15,
    showText: true,
    theme: "primary",
}
export default Progress;