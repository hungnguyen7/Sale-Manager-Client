import {useState, useEffect} from 'react'
import {Button, Row, Col, Modal, Form, Container, Card, Badge} from 'react-bootstrap'
import {useForm} from 'react-hook-form'

import {getDataFromServer} from './Common'
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

export const ModalInvoice=()=>{
    const [showModal, setShowModal]=useState(false);
    const [cart, setCart] = useState([])
    // const [productDetail, setProductDetail] = useState([])
    const {handleSubmit, register} = useForm()
    const handleClose=()=> setShowModal(false)
    const handleShow=()=> setShowModal(true)
    // useEffect(()=>{
    //     const getCustomerCart=async()=>{
    //         cart.map(async value=>{
    //             let data = await getDataFromServer(`/api/product/${value.productId._id}`)
    //             setProductDetail(productDetail=>[...productDetail, data.data])
    //         })
    //     }
    //     getCustomerCart()
    // }, [cart])
    // console.log(productDetail)
    // console.log(cart)
    const getComponent=()=>{
        return(
            <Modal animation={false} show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Hóa đơn</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                   <Badge variant='warning'>Mua vào</Badge>
                   <Container className='border border-warning'>
                       {cart.filter(value=>value.buyInto===true).map((value, index)=>{
                           return(
                               <Container key={index} className='border-bottom'>
                                   <Row><Card.Title className='bg-warning'>{value.productId.name}</Card.Title></Row>
                                   <Row>
                                       <Card.Text className='mr-5'>Loại: {value.type}</Card.Text>
                                       <Card.Text>Khối lượng: {value.amount}</Card.Text>
                                       <Button variant='primary' className='ml-auto btn-sm mb-2'>Sửa</Button>
                                       <Button variant='danger' className='ml-1 btn-sm mb-2'>Xóa</Button>
                                   </Row>
                               </Container>
                           )
                       })}
                   </Container>
                </Container>
                <Container>
                   <Badge variant='success'>Bán ra</Badge>
                   <Container className='border border-success'>
                       {cart.filter(value=>value.buyInto===false).map((value, index)=>{
                           return(
                               <Container key={index} className='border-bottom'>
                                   <Row><Card.Title className='bg-success'>{value.productId.name}</Card.Title></Row>
                                   <Row>
                                       <Card.Text className='mr-5'>Loại: {value.type}</Card.Text>
                                       <Card.Text>Khối lượng: {value.amount}</Card.Text>
                                       <Button variant='primary' className='ml-auto btn-sm mb-2'>Sửa</Button>
                                       <Button variant='danger' className='ml-1 btn-sm mb-2'>Xóa</Button>
                                   </Row>
                               </Container>
                           )
                       })}
                   </Container>
                </Container>
            </Modal.Body>
            </Modal>
        )
    }
    return{
        state: showModal,
        handleClose,
        handleShow,
        setCart,
        getComponent
    }
}