import React, {useState, useEffect} from 'react'

import {getDataFromServer, deleteDataFromServer, postDataToServer, patchDataToServer} from '../Utils/Common'
import {Card, Button, Container, Row, Col, Alert} from 'react-bootstrap'
import {TextAlert, UpdateData} from '../Utils/ManagementState'
import {ModalAlert, ModalForm} from '../Utils/Modal'
const WareHouse=()=>{
    const [data, setData]=useState([])
    // Lấy dữ liệu product mà người dùng chọn
    const [product, setProduct] = useState({
        id: null,
        name: null,
        type: null
    })
    // Modal cho product
    const modalAlert = ModalAlert()
    const modalForm = ModalForm()
    // Modal cho các loại product
    const modalAlertForTypeOfProduct = ModalAlert()
    const modalFormForTypeOfProduct = ModalForm()

    const textAlert = TextAlert()
    // State update lại data hay không?
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

    const handleDeleteType=async product=>{
        await deleteDataFromServer(`/api/product/${product.id}/${product.type}`)
        updateData.updateIt()
        modalAlertForTypeOfProduct.handleClose()
    }

    const onAddType=async data=>{
        data.name = product.name
        data.amount = parseInt(data.amount)
        data.purchasePrice = parseInt(data.purchasePrice)
        data.salePrice = parseInt(data.purchasePrice)
        data.type = parseInt(data.type)
        await postDataToServer('/api/product/create', data)
        modalForm.handleClose()
        updateData.updateIt()
    }

    const onEditType=async data=>{
        data.purchasePrice = parseInt(data.purchasePrice)
        data.salePrice = parseInt(data.purchasePrice)
        data.type = parseInt(product.type)
        await patchDataToServer(`/api/product/${product.id}/edit`, data)
        modalFormForTypeOfProduct.handleClose()
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
                                        <Button variant="primary" className="ml-auto" onClick={()=>{modalForm.handleShow(); setProduct({name: product.name})}}>Thêm</Button>
                                        <Button variant="danger" className='ml-1' onClick={()=>{modalAlert.handleShow(); setProduct({id: product._id})}}>Xóa</Button>
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
                                                                            <Card.Link onClick={()=>{modalFormForTypeOfProduct.handleShow(); setProduct({id: product._id, type: productDetail.type})}}>Sửa</Card.Link>
                                                                            <Card.Link onClick={()=>{modalAlertForTypeOfProduct.handleShow(); setProduct({id: product._id, type: productDetail.type})}}>Xóa</Card.Link>
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
            {modalAlert.getComponent('Thông báo', 'Bạn có muốn xóa hoàn toàn sản phẩm không?', ()=> handleDeleteProduct(product.id))}
            {modalForm.getComponent('Thêm loại sản phẩm', 'Thêm', false, onAddType)}
            {modalAlertForTypeOfProduct.getComponent('Thông báo', 'Bạn có muốn xóa loại sản phẩm này không?', ()=>handleDeleteType(product))}
            {modalFormForTypeOfProduct.getComponent('Sửa giá sản phẩm', 'Sửa', true, onEditType)}
        </Container>
    )
}

export default WareHouse;