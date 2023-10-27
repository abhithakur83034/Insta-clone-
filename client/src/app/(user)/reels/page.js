"use client"
import React, { useEffect, useState } from 'react';
import NAVBAR from '../NAVBAR';
import {Container,Row, Col,Card} from 'react-bootstrap';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const Reelspage = () => {
    const [get, setGet] = useState([]); 
  const router = useRouter()
    useEffect(() => {
        axios
          .get("http://localhost:8080/api/getpost")
          .then((res) => {
            // console.log(res.data.post);
            setGet(res.data.post);
          })
          .catch((error) => {
            console.log(error);
          });
      }, []);
      // console.log("get",get)

const handleCardClick=(id)=>{
    router.push(`/singlepost/${id}`)
}


  return (
    <>
    <NAVBAR/>
    <Container>
        <Row>
            <Col>
            <Row xs={1} md={3} lg={5} className="g-4 mt-3">
  {get.map((item, idx) => (
    
    <Col key={idx}>
      <div onClick={() => handleCardClick(item._id)}>
        <Card style={{ width: '250px' }}>
          <Card.Img
            variant="top"
            src={`http://localhost:8080/img/${item.image}`}
            style={{
              height: "300px",
              width: "250px",
            }}
          />
        </Card>
      </div>
    </Col>
  ))}
</Row>


            </Col>
        </Row>
    </Container>
    </>
  )
}

export default Reelspage