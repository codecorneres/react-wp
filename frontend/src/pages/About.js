import '../App.css';
import '../css/Test.css'; 
import Test from '../components/Test';
import Form from '../components/Form';

const About = () => {
    return (
            <>
            <div className='divider'>
                <Test />
            </div>
            <div className='divider'>
                <Form />
            </div>
            </>
      );
  };
  
  export default About;