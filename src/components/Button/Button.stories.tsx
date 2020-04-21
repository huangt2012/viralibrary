import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Button from './Button'

const defaultButton = () => (
    <Button onClick={action('clicked')}>default button</Button>
)

const buttonWithSize = () => (
    <>
        <Button size='lg'>large button</Button>
        <Button size='sm'>small</Button>
    </>
)

const buttonWidthType = () => (
    <>
        <Button btnType='primary'>primary</Button>
        <Button btnType='danger'>danger</Button>
        <Button btnType='link' href='https://www.baidu.com/'>link</Button>
    </>
)

storiesOf('Button', module)
    .add('Button', defaultButton)
    .add('不同尺寸button', buttonWithSize)
    .add('不同类型button', buttonWidthType);
