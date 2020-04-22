import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Upload, { UploadFile } from './Upload'

const defaultFileList: UploadFile[] = [
  { uid: '123', size: 1234, name: 'hello.md', status: 'uploading', percent: 30 },
  { uid: '122', size: 1234, name: 'xyz.md', status: 'success', percent: 30 },
  { uid: '121', size: 1234, name: 'eyiha.md', status: 'error', percent: 30 }
]
const checkFileSize = (file: File) => {
    if (Math.round(file.size / 1024) > 10) {
        alert('file is too big')
        return false
    }
    return true
}

const checkPromise = (file: File) => {
    const newFile = new File([file], 'new_name.png', { type: file.type })
    return Promise.resolve(newFile)
}
const DefaultComponent = () => {

    return (
        <Upload
            action='http://jsonplaceholder.typicode.com/posts'
            defaultFileList={defaultFileList} 
            onChange={action('change')}
            beforeUpload={checkPromise}
        />
    )
}

storiesOf('Upload 上传组件', module)
    .add('Upload', DefaultComponent)
