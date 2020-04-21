import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Input from './Input'

const ControlledInput = () => {
    const [value, setValue] = useState<string>()
    return <Input
        value={value}
        defaultValue={value}
        onChange={(e) => { setValue(e.target.value) }}
    />
}
const defaultInput = () => (
    <>
        <Input
            style={{ width: '300px' }}
            placeholder="placeholder"
            onChange={action('changed')}
        />
        <ControlledInput />
    </>
)

const disabledInput = () => (
    <Input
        style={{ width: '300px' }}
        placeholder='输入框被禁用'
        disabled
    />
)
const iconInput = () => (
    <Input
        style={{ width: '300px' }}
        placeholder="input with icon"
        icon="search"
    />
)

const sizeInput = () => (
    <>
        <Input
            style={{ width: '300px' }}
            defaultValue="large size"
            size="lg"
        />
        <Input
            style={{ width: '300px' }}
            placeholder="small size"
            size="sm"
        />
    </>
)

const suffixInput = () => (
    <>
        <Input
            style={{ width: '300px' }}
            defaultValue="prepend text"
            prefix="https://"
        />
        <Input
            style={{ width: '300px' }}
            defaultValue="google"
            suffix=".com"
        />

    </>
)

storiesOf('Input 输入框', module)
    .add('Input', defaultInput)
    .add('禁用状态的Input', disabledInput)
    .add('带图标的 Input', iconInput)
    .add('大小不同的 Input', sizeInput)
    .add('带前后缀的 Input', suffixInput)