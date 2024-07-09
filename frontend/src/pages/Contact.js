import '../App.css';
import '../css/Test.css'; 
import Posts from '../components/Posts';
import Form from '../components/Form';

const Contact = () => {
    return (
            <>
             <div className='divider'>
                <Form />
            </div>
            <div className='divider'>
                <Posts />
            </div>
            </>
      );
  };
  
  export default Contact;