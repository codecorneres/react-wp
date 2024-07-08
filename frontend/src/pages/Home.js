import logo from '../logo.svg';
import '../App.css';
import LoginForm from '../components/LoginForm';
import '../css/Test.css'; 

const Home = () => {
    return (
        <div className="App">
          
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
          </header>

          <div className="get-all-data">

            <div className='divider'>
                <LoginForm />
            </div>

          </div>

          <footer className="app-footer">
            <p>This is a footer.</p>
          </footer>

        </div>
      );
  };
  
  export default Home;