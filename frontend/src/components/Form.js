import React,{useEffect, useState } from "react";

function Form () {

    const [list, setList] = useState([]);
    const [listInput, setListInput] = useState('');
    const [telInput, setTelInput] = useState('');
    const [error, setError] = useState('');

    const [editListInput, setEditListInput] = useState('');
    //const [editTelInput, setEditTelInput] = useState('');

    const [editIndex, setEditIndex] = useState('');
    const [updateField, setUpdateField] = useState(false);

    const initialvalues = {
        name: "",
        number: ""
      };
    const [allInputData, setAllInputData] = useState(initialvalues);

    const listTextInput = (e) => {
      //console.log(e.target.value);
        setListInput(
           e.target.value,
        );
      };

    const listTelInput = (e) => {
        //console.log(e.target.value);
        setTelInput(
           e.target.value,
        );
    };
    
      const deleteByIndex = (index) => {
        const data = list.filter((name, i) => i !== index);
        setList(data)
      }
    
      const editByIndex = (index) => {
        setUpdateField(true);
        //console.log(updateField);

        const editData = list.find((name,i) => i == index);
        setEditListInput(
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

        const newList = list.map((item,index) => {
         
          if (index === editIndex) {
            
            item = setEditListInput({
              editListInput,
            }
              
                    );
           
                          
          }
    
          return item;
        });
        console.log(newList);
        setList(newList);
        setEditListInput('');
        //setEditTelInput('');
        setUpdateField(false);
      }

   
    
      const renderListText = () => {
      
        // console.log([...list, {name:listInput,number:telInput}]);
     
        if (listInput && telInput) {
          setList([...list, {name:listInput,number:telInput}]);
          setError('');
          setListInput('');
          setTelInput('');
        } else {
          setError('Please fill form!');
        }     
        
      
        
      }

    return (
        <>
        <div className='form-wrap'>

          <div className='form-data-wrap'>
            {/* <form> */}
                <div className="form-row">
                    <label>Name:</label>
                    <input type='text' name='name' className='name' onChange={listTextInput} value={listInput} />
                
                    <label>Number:</label>
                    <input type='text' name='tel' className='number' onChange={listTelInput} value={telInput} />
                    
                    <button value="Add Data" className="theme-btn" onClick={renderListText} >Add Data</button>
                    
                </div>
                {error && <div style={{ color: 'red'}}>{error}</div>}
               
            {/* </form> */}
        
           
            { updateField && 
            <>
            <div className="form-row">
                <input type='text' name='update-name' className='text' onChange={editListTextInput} value={editListInput.name} />
                <input type='text' name='update-number' className='number' onChange={editListTextInput} value={editListInput.number} />
                <button className='' onClick={renderEditListText}>Update</button>
            </div>
            </>
            }
            
            {list.length > 0 && 
            <div className="list-table-data-wrap">
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Number</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            
                           list.map((list, index) => (
                                <tr>
                                    <td>{index+1}</td>
                                    <td>{list.name}</td>
                                    <td>{list.number}</td>
                                    <td>
                                        <button className="" onClick={() => deleteByIndex(index)}>Delete</button> 
                                        {/* <button className="" onClick={() => editByIndex(index)}>Edit</button> */}
                                    </td>
                                </tr>
                            ))
                        }  
                    </tbody>
                </table>
            </div>
}
          </div>
        </div>
        </>
    );
}
export default Form