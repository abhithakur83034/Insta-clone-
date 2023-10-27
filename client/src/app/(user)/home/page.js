"use client";
import React from "react";
import NAVBAR from "../NAVBAR";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Post from "../posts/page";
import Registeruser from "../registeruser/page";

export default function Home() {
  return (
    <>
      <NAVBAR />
      <Container>
        <Row>
          <Col style={{ borderRight: "1px solid rgba(0, 0, 0, 0.2)" }}>
            <Post />
          </Col>
          <Col>
            <Registeruser />
          </Col>
        </Row>
      </Container>
    </>
  );
}
