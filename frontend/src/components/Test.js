import React, { useEffect, useState } from 'react';

function Test(){
  const [text, setText] = useState('');
  const [input, setInput] = useState('');
  const [increament, setIncreament] = useState(0);
  const [stop, setStop] = useState(false);
  const [name, setName] = useState('');

  const [list, setList] = useState([]);
  const [listInput, setListInput] = useState('');
  const [editListInput, setEditListInput] = useState('');
  const [editIndex, setEditIndex] = useState('');
  const [updateField, setUpdateField] = useState(false);

  const listTextInput = (e) => {
    setListInput(
       e.target.value,
    );
  };

  const deleteByIndex = (index) => {
    const data = list.filter((name, i) => i !== index);
    //console.log(data, 'data')
    setList(data)
  }

  const editByIndex = (index) => {
    setUpdateField(true);
    console.log(updateField);
    //console.log(index,"index");
    const editData = list.find((name, i) => i == index);
    //console.log(editData,"data");
    setEditListInput(
      //e.target.value,
      editData
   );
   setEditIndex(index);
   
  }
  const editListTextInput = (e) => {
    setEditListInput(
      e.target.value,
   );
   
  };

  const renderEditListText = () => {
    //console.log(editIndex, editListInput, 'clicked')
    const newList = list.map((item,index) => {
     // console.log(index);
      if (index === editIndex) {
        item = editListInput;
      }

      return item;
    });
    //console.log(newList);
    setList(newList);
    setEditListInput('');
    setUpdateField(false);
  }

  const renderListText = () => {
  
    if(listInput){
      // const newList = list.concat( listInput );
      // console.log(newList);
      // setList(newList);
      setList([...list, listInput]);
      setListInput('');
    }
    
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
  // const editField = () => {
  //   console.log(updateField,"updateField");
  //   if(updateField){
  //     return (
  //     <>
  //     <input type='text' name='update-name' className='text' onChange={editListTextInput} value={editListInput} />
  //     <button className='' onClick={renderEditListText}>Update Name</button>
  //     </>
  //     );
  //    }
  // }
  
  return (
    <>
    <div className='test-wrap container'>
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
        <h4>Names</h4>
        {/* {editField()} */}
        { updateField && 
        <>
        <input type='text' name='update-name' className='text' onChange={editListTextInput} value={editListInput} />
        <button className='' onClick={renderEditListText}>Update Name</button>
        </>
        }
        <ul>
        
          {
            list.map((item, index) => (
          
              <li style={{ backgroundColor: 'pink', margin: '8px 0', padding: '5px 10px'}}>
                {item} 
              <button className="" onClick={() => deleteByIndex(index)}>Delete</button> 
              <button className="" onClick={() => editByIndex(index)}>edit</button>
              </li>
            ))
          }
          
          
        </ul>
      </div>
    </div>
    </>
  );
  
}
export default Test
