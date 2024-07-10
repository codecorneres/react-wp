import Test from '../components/Test';
import Form from '../components/Form';

const About = () => {
    return (
            <>
            <section className="common-wrapper page-content">
                <div className="container">
                    <div className='divider'>
                        <Test />
                    </div>
                    <div className=''>
                        <Form />
                    </div>
                </div>
            </section>
            </>
      );
  };
  
  export default About;