import React, { useEffect, useState } from 'react';

function Test(){
  const [text, setText] = useState('');
  const [input, setInput] = useState('');
  const [increament, setIncreament] = useState(0);
  const [stop, setStop] = useState(false);

  const [name, setName] = useState('');

 const addName = (name) => {
  setName(name);
 }
  const stoped = () => {
    setStop(false);
  }
  const clicked = () => {
    setStop(true)
  }

    useEffect(() => {
      let interval;
      if (stop) {
        interval = setInterval(() => {
          setIncreament(increament + 1)
        }, 500);
        
      }
      return () => clearInterval(interval)
    }, [increament, stop]);
 
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

    <div className='counter-wrap'>
      <h1>{increament}</h1>
      <button className="" onClick={clicked}>Play</button>
      <button className="" onClick={stoped}>Stop</button>
    </div>

    <div className='render-text-wrap'>
      <input type='text' name='name' className='text' onChange={handlChange} value={input} />
      <button className="" onClick={renderText}>button</button>
      <p>{text}</p>
    </div>

    <div className='add-clicked-btn-name-wrap'>
      <h1>My name is {name}</h1>
      <div className='text-btns'>
        <button className="" onClick={() => addName('Suraj')}>Suraj</button>
        <button className="" onClick={() => addName('Rajat')}>Rajat</button>
      </div>
    </div>
    </>
  );
  
}
export default Test
