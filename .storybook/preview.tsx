import { configure, addDecorator, addParameters } from '@storybook/react';
// import { withInfo } from '@storybook/addons'
import React from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import "../src/styles/index.scss"
library.add(fas)
const wrapperStyle: React.CSSProperties = {
    padding: '20px 40px',
    width: '500px'
}

const storyWrapper = (stroyFn: any) => (
    <div style={wrapperStyle}>
        <h3>组件演示</h3>
        {stroyFn()}
    </div>
)
addDecorator(storyWrapper)
// addDecorator(withInfo)
addParameters({ info: { inline: true, header: false } })

const loaderFn = () => {
    return [
        require('../src/components/Button/Button.stories.tsx')
    ]
}


// automatically import all files ending in *.stories.js
configure(loaderFn, module);