import logo from './logo.svg';
import './App.css';
import Posts from './components/Posts';
import Test from './components/Test';
import Books from './components/Books';

import './css/Test.css'; 

function App() {
  return (
    <div className="App">
      
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <div className="get-all-data">
        <div className='divider'>
        <Posts/>
        </div>
        <div className='divider'>
        <Books/>
        </div>
        <div className=''>
        <Test/>
        </div>
      
      </div>
      <footer className="app-footer">
        <p>This is a footer.</p>
      </footer>
    </div>
  );
}

export default App;
