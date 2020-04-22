import React from 'react'
import { storiesOf } from '@storybook/react'
import Progress from './Progress'
const DefaultComponent = () => {

    return (
        <Progress
            percent={20}
        />
    )
}

storiesOf('Progress 进度条组件', module)
    .add('Progress', DefaultComponent)
