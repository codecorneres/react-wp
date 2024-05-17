import React, { useEffect, useState } from 'react';

function Test(){
  const [text, setText] = useState('');
  const [input, setInput] = useState('');
  const [increament, setIncreament] = useState(0);

  const clicked = () => {
    if (increament < 20) {
      setIncreament( 
        increament + 1
      );
    } else {
      setIncreament(0)
    }
   
  }

    useEffect(() => {
      
      setTimeout(() => {
        clicked()
      }, 500);
    }, [increament]);
 
  const handlChange = (e) => {
    // console.log(e.target.value, 'ttt')
    setInput(
       e.target.value,
    );
  };

  const renderText = () => {
     //console.log(input);
     setText( input)
  };
  return (
    <>

     <div>
     <h1>{increament}</h1>
     <button className="" onClick={clicked}>Increament</button>
     </div>

    <input type='text' name='name' className='text' onChange={handlChange} value={input} />
    <button className="" onClick={renderText}>button</button>
    <p>{text}</p>
    </>
  );
  
}
export default Test
