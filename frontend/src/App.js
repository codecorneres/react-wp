import logo from './logo.svg';
import './App.css';
import Posts from './components/Posts';
import Test from './components/Test';
import './css/Test.css'; 

function App() {
  return (
    <div className="App">
      
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <div class="get-posts">
        <Posts/>
        <Test/>
      </div>
      <footer class="app-footer">
        <p>This is a footer.</p>
      </footer>
    </div>
  );
}

export default App;
