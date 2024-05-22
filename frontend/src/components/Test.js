import React, { useEffect, useState } from 'react';

function Test(){
  const [text, setText] = useState('');
  const [input, setInput] = useState('');
  const [increament, setIncreament] = useState(0);
  const [stop, setStop] = useState(false);
  const [name, setName] = useState('');

  const [list, setList] = useState([]);
  const [listInput, setListInput] = useState('');

  const listTextInput = (e) => {
    setListInput(
       e.target.value,
    );
  };


  const renderListText = () => {
    if(listInput){
      setList(listInput);
      
    }
    // if(listInput){
    //   const newList = listInput.concat({ name });

    //   setList(newList);
    // }
    
  }


 const addName = (name) => {
  if(name == 'Suraj'){
    setName(name+' Bhardwaj, Php Developer');
  }else if(name == 'Rajat'){
    setName(name+' Sharma, React Developer')
  }
  
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

    <div className='render-list-text-wrap'>
      <input type='text' name='list-name' className='text' onChange={listTextInput} value={listInput} />
      <button className="" onClick={renderListText}>Add Name</button>
      <ul>
        <li><u>Names</u></li>
        {list}
        
      </ul>
    </div>
    </>
  );
  
}
export default Test
