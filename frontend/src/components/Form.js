import React,{useEffect, useState } from "react";

function Form () {

    const [list, setList] = useState([]);
    const [listInput, setListInput] = useState('');
    const [telInput, setTelInput] = useState('');
    const [editListInput, setEditListInput] = useState('');
    const [editIndex, setEditIndex] = useState('');
    const [updateField, setUpdateField] = useState(false);

    const initialvalues = {
        name: "",
        number: ""
      };
    const [allInputData, setAllInputData] = useState(initialvalues);

    const listTelInput = (e) => {
        //console.log(e.target.value);
        setTelInput(
            e.target.value,
        );
    };

    const listTextInput = (e) => {
        setListInput(
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

        const editData = list.find((name, i) => i == index);
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
            item = editListInput;
          }
    
          return item;
        });
        setList(newList);
        setEditListInput('');
        setUpdateField(false);
      }
    
      const renderListText = () => {
        console.log(allInputData);
        if(allInputData){
            setList([...list,allInputData:{name:listInput,number:telInput}]);
            setListInput('');
        }
        
        // if(listInput){
        //   setList([...list, listInput]);
        //   setListInput('');
        // }
        
      }

    return (
        <>
        <div className='form-wrap container'>

          <div className='form-data-wrap'>
            {/* <form> */}
                <div className="form-row">
                    <label>Name:</label>
                    <input type='text' name='name' className='name' onChange={listTextInput} value={listInput} />
                
                    <label>Number:</label>
                    <input type='text' name='tel' className='number' onChange={listTelInput} value={telInput} />
                    
                    <button value="Add Data" onClick={renderListText} >Add Data</button>
                    
                </div>
               
            {/* </form> */}
            
           
            { updateField && 
            <>
            <div className="form-row">
                <input type='text' name='update-name' className='text' onChange={editListTextInput} value={editListInput} />
                <input type='text' name='update-number' className='number' onChange='' value='' />
                <button className='' onClick={renderEditListText}>Update</button>
            </div>
            </>
            }
            
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
                            list.map((item, index) => (
                                <tr>
                                    <td>{index+1}</td>
                                    <td>{item}</td>
                                    <td></td>
                                    <td>
                                        <button className="" onClick={() => deleteByIndex(index)}>Delete</button> 
                                        <button className="" onClick={() => editByIndex(index)}>Edit</button>
                                    </td>
                                </tr>
                            ))
                        }  
                    </tbody>
                </table>
            </div>
          </div>
        </div>
        </>
    );
}
export default Form