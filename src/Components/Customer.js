import React, {useState, useEffect} from 'react'
import {Card, Container, Row, Col, Button} from 'react-bootstrap'
import {getDataFromServer, deleteDataFromServer} from '../Utils/Common'
import {UpdateData} from '../Utils/ManagementState'
import {ModalAlert, ModalInvoice} from '../Utils/Modal'
const Customer=()=>{
    const [customerList, setCustomerList] = useState([])
    const [customer, setCustomer] = useState(null)

    const modalAlert = ModalAlert()
    const modalInvoice = ModalInvoice()

    const updateData = UpdateData()
    useEffect(()=>{
        const fetchData=async()=>{
            const data=await getDataFromServer('/api/customer/all')
            setCustomerList(data.data)
        }
        fetchData()
    },[updateData.updateState])


    const handleDeleteCustomer=async id =>{
        await deleteDataFromServer('/api/customer/'+id)
        updateData.updateIt()
        modalAlert.handleClose()
    }

    const getCustomerCart=async id =>{
        let data = await getDataFromServer(`/api/customer/${id}/cart`)
        let count = await getDataFromServer(`/api/customer/${id}/getBill`)
        console.log(count.data)
        modalInvoice.setOrderPrice(count.data.totalPrice)
        modalInvoice.setCart(data.data.cart)
    }
    return(
        <Container>
            {customerList.map((customer, index)=>{
                return (
                    <Row key={index}>
                        <Col>
                            <Container>
                                <Card>
                                    <Card.Body>
                                        <Row>
                                            <Card.Title>{customer.name}</Card.Title>
                                            <Button variant='info' className='ml-auto' onClick={()=>{
                                                modalInvoice.handleShow()
                                                getCustomerCart(customer._id)
                                                setCustomer(customer._id)
                                            }}>Xem hoá đơn</Button>
                                            <Button variant='danger' className='ml-2' onClick={()=>{
                                                modalAlert.handleShow()
                                                setCustomer(customer._id)
                                            }}>Xóa</Button>
                                        </Row>
                                        <Card.Text>Address: {customer.address}</Card.Text>
                                        <Card.Text>Phone: {customer.phone}</Card.Text>
                                        {/* <Card.Text>Tổng tiền: {Math.random()}</Card.Text> */}
                                    </Card.Body>
                                </Card>
                            </Container>
                        </Col>
                    </Row>
                )
            })}
        {modalAlert.getComponent('Thông báo', 'Bạn có chắc chắn muốn xóa khách hàng và toàn bộ đơn hàng của khách hàng này không?', ()=>handleDeleteCustomer(customer))}
        {modalInvoice.getComponent(()=>getCustomerCart(customer), customer)}
        </Container>
    )
}

export default Customer