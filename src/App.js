import logo from './logo.svg';
import './App.css';
import useDrapDrop from './hooks/useDrap.js'

function App() {
  const [style1, dropRef] = useDrapDrop()

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p ref={ dropRef }
          style={{ transform: `translate(${ style1.x }px, ${ style1.y }px)` }}>
          move me <code>src/App.js</code> and save to reload.
        </p>
        <a
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
