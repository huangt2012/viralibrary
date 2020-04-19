import React from 'react'
import Menu from './components/Menu/Menu'
import MenuItem from './components/Menu/MenuItem'

function App() {

  return (
    <div className="App">
      <Menu defaultIndex={0} onSelect={(index) => {
        console.log(index)
      }}>
        <MenuItem>link</MenuItem>
        <MenuItem>link</MenuItem>
        <MenuItem>link</MenuItem>
      </Menu>
    </div>
  );
}

export default App;
