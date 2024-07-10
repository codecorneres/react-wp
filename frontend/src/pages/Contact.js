import Posts from '../components/Posts';
import Form from '../components/Form';

const Contact = () => {
    return (
            <>
             <section className="common-wrapper page-content">
                <div className="container">
                    <div className='divider'>
                        <Form />
                    </div>
                    <div className=''>
                        <Posts />
                    </div>
                </div>
            </section>
            </>
      );
  };
  
  export default Contact;