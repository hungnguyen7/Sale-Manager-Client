import {useState} from 'react'
import {Button, Col, Modal, Form} from 'react-bootstrap'
import {useForm} from 'react-hook-form'

export const ModalForm = ()=>{
    const [showModal, setShowModal]=useState(false);
    const {handleSubmit, register} = useForm()
    const handleClose=()=> setShowModal(false)
    const handleShow=()=> setShowModal(true)
    const getComponent=(title, actionType, editDetail, action)=>{
        return (
            <Modal animation={false} show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit(action)}><Form.Group>
                <Modal.Body>
                    {editDetail?'':<Form.Row>
                        <Form.Label as={Col}>Loại sản phẩm</Form.Label>
                        <Form.Group as={Col}>
                            {[1, 2, 3].map(type=>(
                                    <Form.Check key={type} inline type='radio' name='type' label={type} value={type} ref={register()}></Form.Check>
                                ))}
                        </Form.Group>
                    </Form.Row>}
                    <Form.Label>Khối lượng</Form.Label>
                    <Form.Control min='0' type='number' placeholder='Nhập khối lượng' name='amount' ref={register()}></Form.Control>
                    <Form.Label>Giá mua vào</Form.Label>
                    <Form.Control min='0' type='number' placeholder='Nhập giá mua vào' name='purchasePrice' ref={register()}></Form.Control>
                    <Form.Label>Giá bán ra</Form.Label>
                    <Form.Control min='0' type='number' placeholder='Nhâp giá bán ra' name='salePrice' ref={register()}></Form.Control>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Hủy
                    </Button>
                    <Button type='submit' variant="primary">
                        {actionType}
                    </Button>
                </Modal.Footer>
                </Form.Group></Form>
            </Modal>
        )
    }
    return{
        state: showModal,
        handleClose,
        handleShow,
        getComponent
    }
}
export const ModalAlert=()=>{
    const [showModal, setShowModal]=useState(false);
    const handleClose=()=> setShowModal(false)
    const handleShow=()=> setShowModal(true)
    const getComponent=(title, content, action)=>{
        return(
            <Modal animation={false} show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{content}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Không
                    </Button>
                    <Button variant="danger" onClick={()=>action()}>
                        Có
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }
    return {
        state: showModal,
        handleClose,
        handleShow,
        getComponent
    }
}