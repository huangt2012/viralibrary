import React from 'react'
import Button, { ButtonSize, ButtonType } from './components/Button/Button'

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <Button>button end</Button>
        <Button btnType={ButtonType.Primary} disable >button end</Button>

        <Button btnType={ButtonType.Link} href='https://github.com/huangt2012/viralibrary' target='_blank'> button end</Button>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p><a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
