import React, { useState } from 'react'
import classNames from 'classnames'

export type AlertType = 'success' | 'default' | 'danger' | 'warning'

export interface AlertProps {
    title?: string
    content: string
    type: AlertType
    closable?: boolean
    onClose?: () => void
}

const Alert: React.FC<AlertProps> = (props: AlertProps) => {
    const {
        title,
        content,
        type,
        closable = true,
        onClose
     } = props

     const [visible, setVisible] = useState<boolean>(true)

     const handleClose = (): void => {
        if (typeof onClose === 'function') {
            onClose()
        }
        setVisible(false)
     }
    return (
        <div className={classNames('alert', {
            [`alert-${type}`]: type,
            hidden: !visible
        })}>
            <h4 className='alert-title'>{title}</h4>
            <div className='alert-content'>{content}</div>
            {closable && (
                <div
                    className='alert-close-btn'
                    onClick={handleClose}
                >关闭</div>
            )}
        </div>
    )
}

export default Alert