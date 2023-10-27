"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Col, Container, Row, Card } from "react-bootstrap";
import NAVBAR from "../../NAVBAR";

export default function Archive({ params }) {
  const id = params.arch;
  console.log(id);

  const [get, setGet] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/getpost")
      .then((res) => {
        // Filter posts based on the user's _id during data retrieval
        const filteredPosts = res.data.post.filter(
          (item) => item.userId === id
        );
        setGet(filteredPosts);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  console.log("get", get);
  return (
    <>
    <NAVBAR/>
    <Container className="mt-3">
        <Row>
            <Col>
            <Row xs={1} md={3} className="g-4">
                  {get.map((item, idx) => (
                    <Col key={idx}>
                      <Card>
                        <center>
                        <Card.Img
                          variant="top"
                          src={`http://localhost:8080/img/${item.image}`}
                          style={{
                            height: "300px",
                            width: "255px",
                          }}
                        />
                        </center>
                      </Card>
                    </Col>
                  ))}
                </Row>
            </Col>
        </Row>
    </Container>
    </>
  );
}
