import {useState} from 'react'

export const TextAlert=()=>{
    const [textAlert, setTextAlert]=useState(false)
    const handleClose=()=> setTextAlert(false)
    const handleShow=()=> setTextAlert(true)
    return{
        state: textAlert,
        handleShow,
        handleClose
    }
}
export const UpdateData=()=>{
    const [updateState, setUpdateState] = useState(false);
    const updateIt=()=>setUpdateState(!updateState)
    return{
        updateState,
        updateIt
    }
}

export const Product=()=>{
    const [id, setId]=useState('')
    return{
        id, 
        setId
    }
}