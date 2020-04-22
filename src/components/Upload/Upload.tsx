import React, { FC, useRef, useState, ChangeEvent } from 'react'
import axios from 'axios'
import Button from '../Button/Button'
import UploadList from './UploadList'
import Dragger from './Dragger'

export type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error'

export interface UploadFile {
    uid: string
    size: number
    name: string
    status?: UploadFileStatus
    percent?: number
    raw?: File
    response?: any
    error?: any
}

export interface UploadProps {
    /** 上传文件地址 */
    action: string
    /** 默认已上传的文件 */
    defaultFileList?: UploadFile[]
    /** 文件上传前 */
    beforeUpload?: (file: File) => boolean | Promise<File>
    /** 上传进度回调 */
    onProgress?: (pecentage: number, file: File) => void
    /** 上传成功回调 */
    onSuccess?: (data: any, file: File) => void
    /** 上传失败回调 */
    onError?: (err: any, file: File) => void
    /** 文件改变时回调，不管成功失败 */
    onChange?: (file: File) => void
    /** 移除某个已上传的文件 */
    onRemove?: (file: UploadFile) => void
    /** 设置上传头部信息 */
    headers?: { [key: string]: any }
    /** 设置上传文件时参数名 */
    name?: string;
    /** 上传时其他参数 */
    data?: { [key: string]: any };
    /** 是否需要cookie */
    withCredentials?: boolean;
    accept?: string;
    multiple?: boolean;
    drag?: boolean;
}

/**
 * Upload 组件
 * ~~~js
 * import { Upload } from viralibrary
 * ~~~
 */
export const Upload: FC<UploadProps> = (props) => {
    const {
        action,
        defaultFileList,
        onProgress,
        onSuccess,
        onError,
        beforeUpload,
        onChange,
        onRemove,
        name,
        headers,
        data,
        withCredentials,
        accept,
        multiple,
        children,
        drag
    } = props
    const fileInput = useRef<HTMLInputElement>(null)
    const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList || [])
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (!files) {
            return
        }
        handleUploadFiles(files)
        if (fileInput.current) {
            fileInput.current.value = ''
        }
    }

    const updateFilelist = (updateFile: UploadFile, updateObj: Partial<UploadFile>) => {
        setFileList(prevList => {
            return prevList.map((file) => {
                if (file.uid === updateFile.uid) {
                    return {...file, ...updateObj}
                } else {
                    return file
                }
            })
        })
    }

    const handleRemove = (file: UploadFile) => {
        setFileList(prevList => {
            return prevList.filter((item) => item.uid !== file.uid)
        })
        if (onRemove) {
            onRemove(file)
        }
    }

    const postFile = (file: File) => {
        let _file: UploadFile = {
            uid: `${Date.now()}upload-file`,
            status: 'ready',
            size: file.size,
            name: file.name,
            percent: 0,
            raw: file
        }
        setFileList(prevList => {
            return [_file, ...prevList]
        })

        const formData = new FormData()
        formData.append(name || 'file', file)
        if (data) {
            Object.keys(data).forEach(key => {
                formData.append(key, data[key])
            })
        }

        axios.post(action, formData, {
            headers: {
                ...headers,
                'Content-type': 'multipart/form-data'
            },
            withCredentials,
            onUploadProgress: (e: any) => {
                const percentage = Math.round((e.loaded * 100) / e.total) || 0
                if (percentage <= 100) {
                    updateFilelist(_file, { percent: percentage, status: 'uploading' })
                    if (onProgress) {
                        onProgress(percentage, file)
                    }
                }
            }
        }).then(resp => {
            updateFilelist(_file, { status: 'success', response: resp.data})
            if (onSuccess) {
                onSuccess(resp.data, file)
            }
            if (onChange) {
                onChange(file)
            }
        }).catch(err => {
            updateFilelist(_file, { status: 'error', error: err })
            if (onError) {
                onError(err, file)
            }
            if (onChange) {
                onChange(file)
            }
        })
    }

    const handleUploadFiles = (files: FileList) => {
        Array.from(files).forEach((file) => {
            if (!beforeUpload) {
                postFile(file)
            } else {
                const result = beforeUpload(file)
                if (result && result instanceof Promise) {
                    result.then(processedFile => {
                        postFile(processedFile)
                    })
                } else if (result === true) {
                    postFile(file)
                }
            }
        })
    }
    const handleClick = () => {
        if (fileInput.current) {
            fileInput.current.click()
        }
    }
    return (
        <div className='vira-upload'>
            <div className="vira-upload-input"
                style={{ display: 'inline-block' }}
                onClick={handleClick}>
                {drag ?
                    <Dragger onFile={(files) => { handleUploadFiles(files) }}>
                        {children}
                    </Dragger> :
                    children
                }
                <input
                    className="vira-file-input"
                    style={{ display: 'none' }}
                    ref={fileInput}
                    onChange={handleFileChange}
                    type="file"
                    accept={accept}
                    multiple={multiple}
                />
            </div>
            <UploadList
                fileList={fileList}
                onRemove={handleRemove}
            />
        </div>
    )
}

Upload.defaultProps = {
    headers: {
        'Content-type': 'multipart/form-data'
    },
    name: 'file'
}

export default Upload;
