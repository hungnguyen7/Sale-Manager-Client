import React, {useState, useEffect} from 'react'
import {useForm} from 'react-hook-form'

import {getDataFromServer, deleteDataFromServer, postDataToServer} from '../Utils/Common'
import {Card, Button, Container, Row, Col, Modal, Alert, Form} from 'react-bootstrap'
import {ModalState, TextAlert, UpdateData} from '../Utils/ManagementState'
const WareHouse=(props)=>{
    const [data, setData]=useState([])
    const [productId, setProductId] = useState('')
    const {handleSubmit, register} = useForm()

    const modalAlert = ModalState()
    const modalForm = ModalState()

    const textAlert = TextAlert()
    const updateData = UpdateData()
    
    useEffect(() => {
        const fetchData=async()=>{
            const data=await getDataFromServer('/api/product/all')
            setData(data.data)
        }
        fetchData()
    }, [updateData.updateState])
   
    const handleDeleteProduct=async id=>{
        await deleteDataFromServer('/api/product/'+id)
        updateData.updateIt()
        modalAlert.handleClose()
        textAlert.handleShow()
        setTimeout(()=>textAlert.handleClose(), 3000)
    }

    const onSubmit=async(data)=>{
        data.name = productId
        data.amount = parseInt(data.amount)
        data.purchasePrice = parseInt(data.purchasePrice)
        data.salePrice = parseInt(data.purchasePrice)
        data.type = parseInt(data.type)
        await postDataToServer('/api/product/create', data)
        modalForm.handleClose()
        updateData.updateIt()
    }

    return(
        <Container>
            {textAlert.state?<Alert variant='success'>Xóa thành công</Alert>:''}
            {data.map((product, index)=>{
                return (
                    <Row className='my-2' key={index}>
                        <Col>
                            <Container><Card style={{backgroundColor: '#3D394D'}}>
                                <Card.Body>
                                    <Row className='mb-2'>
                                        <Card.Title className='text-white'>{product.name}</Card.Title>
                                        <Button variant="primary" className="ml-auto" onClick={()=>{modalForm.handleShow(); setProductId(product.name)}}>Thêm</Button>
                                        <Button variant="danger" className='ml-1' onClick={()=>{modalAlert.handleShow(); setProductId(product._id)}}>Xóa</Button>
                                    </Row>
                                    <Row>
                                        <Container>
                                            <Row>
                                                {product.classification.map((productDetail, index)=>{
                                                    return(
                                                        <Col key={index}>
                                                            <Card>
                                                                <Card.Title className='text-center pb-3 mb-0 pt-3' style={productDetail.type===1?{backgroundColor: '#FF546B'}:productDetail.type===2?{backgroundColor: '#17D0B7'}:{backgroundColor: '#00DEDE'}}>Loại: {productDetail.type}</Card.Title>
                                                                <Card.Body style={{backgroundColor: '#F6F6F6'}}>
                                                                    <Card.Text>Khối lượng: {productDetail.amount}</Card.Text>
                                                                    <Card.Text className='text-green-600'>Giá mua vào: {productDetail.purchasePrice}</Card.Text>
                                                                    <Card.Text>Giá bán ra: {productDetail.salePrice}</Card.Text>
                                                                    <Container>
                                                                        <Row>
                                                                            <Card.Link>Sửa</Card.Link>
                                                                            <Card.Link>Xóa</Card.Link>
                                                                        </Row>
                                                                    </Container>
                                                                </Card.Body>
                                                            </Card>   
                                                        </Col>
                                                    )
                                                })}
                                            </Row>
                                        </Container>
                                    </Row>  
                                </Card.Body>
                            </Card></Container>
                        </Col>
                    </Row>
                )
            })}
            <Modal animation={false} show={modalAlert.state} onHide={modalAlert.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Thông báo</Modal.Title>
                </Modal.Header>
                <Modal.Body>Bạn có chắc chắn muốn xóa hoàn toàn sản phẩm này không?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={modalAlert.handleClose}>
                        Không
                    </Button>
                    <Button variant="danger" onClick={()=>handleDeleteProduct(productId)}>
                        Có
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal animation={false} show={modalForm.state} onHide={modalForm.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Thêm loại sản phẩm</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit(onSubmit)}><Form.Group>
                <Modal.Body>
                            <Form.Row>
                                <Form.Label as={Col}>Loại sản phẩm</Form.Label>
                                <Form.Group as={Col}>
                                    {[1, 2, 3].map(type=>(
                                            <Form.Check key={type} inline type='radio' name='type' label={type} value={type} ref={register()}></Form.Check>
                                        ))}
                                </Form.Group>
                            </Form.Row>
                            <Form.Label>Khối lượng</Form.Label>
                            <Form.Control min='0' type='number' placeholder='Nhập khối lượng' name='amount' ref={register()}></Form.Control>
                            <Form.Label>Giá mua vào</Form.Label>
                            <Form.Control min='0' type='number' placeholder='Nhập giá mua vào' name='purchasePrice' ref={register()}></Form.Control>
                            <Form.Label>Giá bán ra</Form.Label>
                            <Form.Control min='0' type='number' placeholder='Nhâp giá bán ra' name='salePrice' ref={register()}></Form.Control>
               
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={modalForm.handleClose}>
                        Không
                    </Button>
                    <Button type='submit' variant="primary">
                        Có
                    </Button>
                </Modal.Footer>
                </Form.Group></Form>
            </Modal>
        </Container>
    )
}



export default WareHouse;