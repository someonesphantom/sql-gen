import React, { useState,  useEffect } from 'react';
import TextField from '@mui/material/TextField';

function useForceupdate(){
    const [value,setValue] = useState(0);
    return ()=>setValue(value=>value+1);
}

export default function DynamicForm(Props){
    const [entryStateArray,setEntryStateArray] =useState(Props.inputStateList)

    const forceUpdate = useForceupdate();
    const setInInputListOnChange=(value,idx)=>{
        let currState =entryStateArray
        currState[idx].value = value
        setEntryStateArray(currState)
        forceUpdate()
        Props.setInputStateList(currState)
    }
    return(
        <div>
            {
                Props.Form.map(
                    (formObject,i) => (
                        <TextField 
                            key = {i}
                            autoFocus
                            margin='dense'
                            disabled={Props.isViewOnlyMode}
                            value = {entryStateArray[i].value}
                            onChange={(e)=>{setInInputListOnChange(e.target.value,i)}}
                            id = {formObject.id}
                            label = {formObject.label}
                            type = {formObject.type}
                            fullWidth
                        />
                    )
                )
            }
        </div>
    )
}