import React, { FC } from 'react'
import { UploadFile } from './Upload'
import Icon from '../Icon/Icon'
import Progress from '../Progress/Progress'

interface UploadListProps {
    fileList: UploadFile[]
    onRemove: (file: UploadFile) => void
}

export const UploadList: FC<UploadListProps> = (props) => {
    const { fileList, onRemove } = props
    return (
        <ul className='vira-upload-list'>
            {fileList.map((item) => (
                <li
                    key={item.uid}
                    className='vira-upload-list-item '
                >
                    <span className={`file-name file-name-${item.status}`}>
                        <Icon icon="file-alt" theme="secondary"  />
                        {item.name}
                    </span>
                    <span className='file-status'>
                        {(item.status === 'uploading' || item.status === 'ready') && <Icon icon="spinner" spin theme="primary" />}
                        {item.status === 'success' && <Icon icon="check-circle" theme="success" />}
                        {item.status === 'error' && <Icon icon="times-circle" theme="danger" />}
                    </span>
                    <span className="file-actions">
                        <Icon icon="times" onClick={() => { onRemove(item) }} />
                    </span>
                    {item.status === 'uploading' &&
                        <Progress
                            percent={item.percent || 0}
                        />
                    }

                </li>
            ))}
        </ul>
    )
}

export default UploadList;