import React, {useState, useEffect} from 'react'
import {Card, Container, Row, Col, Alert, Button} from 'react-bootstrap'
import {getDataFromServer, deleteDataFromServer} from '../Utils/Common'
import {TextAlert, UpdateData} from '../Utils/ManagementState'
import {ModalAlert, ModalForm} from '../Utils/Modal'
const Customer=()=>{
    const [customerList, setCustomerList] = useState([])
    const [customer, setCustomer] = useState(null)
    const modalAlert = ModalAlert()

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
                                            <Button variant='info' className='ml-auto'>Xem hoá đơn</Button>
                                            <Button variant='danger' className='ml-2' onClick={()=>{modalAlert.handleShow(); setCustomer(customer._id)}}>Xóa</Button>
                                        </Row>
                                        <Card.Text>Address</Card.Text>
                                        <Card.Text>Phone: {Math.random()}</Card.Text>
                                        <Card.Text>Tổng tiền: {Math.random()}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Container>
                        </Col>
                    </Row>
                )
            })}
        {modalAlert.getComponent('Thông báo', 'Bạn có chắc chắn muốn xóa khách hàng và toàn bộ đơn hàng của khách hàng này không?', ()=>handleDeleteCustomer(customer))}
        </Container>
    )
}

export default Customer