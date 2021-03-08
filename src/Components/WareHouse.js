import React, {useState, useEffect, useCallback} from 'react'
import {getDataFromServer, deleteDataFromServer} from '../Utils/Common'
import {Card, Button, Container, Row, Col, Modal} from 'react-bootstrap'
const WareHouse=(props)=>{
    const [data, setData]=useState([])
    const [show, setShow]=useState(false);
    const [update, setUpdate] = useState(false);
    const [product, setProduct] = useState('')
    useEffect(() => {
        const fetchData=async()=>{
            console.log('Calling')
            const data=await getDataFromServer('/api/product/all')
            setData(data.data)
            setUpdate(false);
        }
        fetchData()
    }, [update])
    const handleClose = () => setShow(false);
    const handleShow = (id) => {
        setShow(true)
        setProduct(id)
    };
    const handleDeleteProduct=useCallback(id=>{
        console.log(id)
        deleteDataFromServer('/api/product/'+id)
        setUpdate(true)
        setShow(false)
    })
    return(
        <Container>
            {data.map((product, index)=>{
                return (
                    <Row className='my-2' key={index}>
                        <Col>
                            <Container><Card style={{backgroundColor: '#3D394D'}}>
                                <Card.Body>
                                    <Row className='mb-2'>
                                        <Card.Title className='text-white'>{product.name}</Card.Title>
                                        <Button variant="primary" className="ml-auto">Thêm</Button>
                                        <Button variant="danger" className='ml-1' onClick={()=>handleShow(product._id)}>Xóa</Button>
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
            <Modal animation={false} show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Thông báo</Modal.Title>
                </Modal.Header>
                <Modal.Body>Bạn có chắc chắn muốn xóa hoàn toàn sản phẩm này không?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Không
                    </Button>
                    <Button variant="danger" onClick={()=>handleDeleteProduct(product)}>
                        Có
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}

export default WareHouse;