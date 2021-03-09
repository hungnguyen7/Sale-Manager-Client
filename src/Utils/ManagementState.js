import {useState} from 'react'


export const ModalState=()=>{
    const [showModal, setShowModal]=useState(false);
    const handleClose=()=> setShowModal(false)
    const handleShow=()=> setShowModal(true)
    return {
        state: showModal,
        handleClose,
        handleShow
    }
}
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