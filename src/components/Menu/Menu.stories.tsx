import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Menu from './Menu'
import MenuItem from './MenuItem'
import SubMenu from './SubMenu'

const defaultMenu = () => (
    <Menu defaultIndex={'0'} mode='horizontal' onSelect={action('select')}>
        <MenuItem>首页</MenuItem>
        <MenuItem>作品集</MenuItem>
        <MenuItem>关于我们</MenuItem>
        <MenuItem disabled>常见问题</MenuItem>
        <SubMenu title='下拉菜单'>
            <MenuItem>下拉菜单1</MenuItem>
            <MenuItem>菜单2</MenuItem>
        </SubMenu>
    </Menu>
)

const verticalMenu = () => (
    <Menu defaultIndex={'0'} mode='vertical' defaultOpenSubmenus={['4']} onSelect={action('select')}>
        <MenuItem>首页</MenuItem>
        <MenuItem>作品集</MenuItem>
        <MenuItem>关于我们</MenuItem>
        <MenuItem disabled>常见问题</MenuItem>
        <SubMenu title='下拉菜单'>
            <MenuItem>下拉菜单1</MenuItem>
            <MenuItem>菜单2</MenuItem>
        </SubMenu>
    </Menu>
)

storiesOf('Menu', module)
    .add('Menu', defaultMenu)
    .add('垂直导航', verticalMenu)
