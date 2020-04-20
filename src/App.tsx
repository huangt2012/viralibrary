import React from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import Menu from './components/Menu'
import Icon from './components/Icon/Icon'
library.add(fas)

function App() {

  return (
    <div className="App">
      <Icon icon='arrow-alt-circle-down' size='10x' theme='primary' />
      <Menu defaultIndex={'0'} mode='horizontal' defaultOpenSubmenus={['4']} onSelect={(index) => {
        console.log(index)
      }}>
        <Menu.Item>首页</Menu.Item>
        <Menu.Item>作品集</Menu.Item>
        <Menu.Item>关于我们</Menu.Item>
        <Menu.Item disabled>常见问题</Menu.Item>
        <Menu.SubMenu title='下拉菜单'>
          <Menu.Item>下拉菜单1</Menu.Item>
          <Menu.Item>菜单2</Menu.Item>
        </Menu.SubMenu>
      </Menu>
    </div>
  );
}

export default App;
