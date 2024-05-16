import logo from './logo.svg';
import './App.css';
import Posts from './components/Posts';
import Test from './components/Test';
import Books from './components/Books';
import BookItems from './components/BookItems';
import './css/Test.css'; 

function App() {
  return (
    <div className="App">
      
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <div className="get-posts">
        <Posts/>
        <Test/>
        <Books/>
      </div>
      <footer className="app-footer">
        <p>This is a footer.</p>
      </footer>
    </div>
  );
}

export default App;
