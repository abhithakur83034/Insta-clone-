"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Container, Row, Col } from 'react-bootstrap';
import NAVBAR from '../../NAVBAR';
import { useParams } from "next/navigation";


export default function Sepshow(){
    const ids = useParams()
    const id = ids.ssf
    console.log(id)
    
  const [follow, setFollow] = useState([]);
  const [following, setFollowing] = useState([]);
  const [viewingFollowers, setViewingFollowers] = useState(true); 

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/followers`)
      .then((res) => {
        // console.log(res.data);
        const userData = res.data;
        const filterfollower = userData.filter((item) => item.userId === id);
        setFollow(filterfollower);

        const filterfollowing = userData.filter((item) => item.followBy === id);
        setFollowing(filterfollowing);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // console.log("follower", follow);
  // console.log("following", following);

  const [user, setUser] = useState([]);
  const [loguser, setLoguser] = useState([])
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/registereduser`)
      .then((res) => {
        const userData = res.data.message;
        setUser(userData);
        const filterLoguser = userData.filter((item)=> item._id === id)
        setLoguser(filterLoguser[0])
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  console.log("user", loguser.name);

    return(
        <>
      <NAVBAR />
      <Container fluid>
        <Row className="mt-3">
          <Col></Col>

          <Col>
            <Card>
            <span style={{fontSize:"20px", borderBottom:"1px solid rgba(0, 0, 0, 0.4)"}}>{loguser.name}</span>
            {/* <hr/> */}
              <Card.Title>
                <Row style={{ textAlign: "center" }}>
                <Col
  onClick={() => setViewingFollowers(true)}
  style={{
    cursor: "pointer",
    position: "relative",
  }}
>
  Followers
  {viewingFollowers && (
    <div
      style={{
        position: "absolute",
        bottom: "0",
        left: "50%",
        top:"25px",
        transform: "translateX(-50%)",
        width: "10px", 
        height: "10px", 
        background: "red",
        borderRadius: "50%" 
      }}
    ></div>
  )}
</Col>
<Col
  onClick={() => setViewingFollowers(false)}
  style={{
    cursor: "pointer",
    position: "relative",
  }}
>
  Following
  {!viewingFollowers && (
    <div
      style={{
        position: "absolute",
        bottom: "0",
        left: "50%",
        top:"25px",
        transform: "translateX(-50%)",
        width: "10px", 
        height: "10px",
        background: "red",
        borderRadius: "50%"
      }}
    ></div>
  )}
</Col>

                </Row>
              </Card.Title>
              <Card.Body>
                {viewingFollowers
                  ? follow.map((item, index) => {
                      // Find the user who is being followed
                      const followers = user.find((u) => u._id === item.followBy);

                      // Check if a user was found
                      if (followers) {
                        return (
                          <Row key={index} style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.4)" }} className="mt-2">
                            <Col sm={3}>
                              <img
                                src={`http://localhost:8080/img/${followers.image}`}
                                alt="img"
                                style={{
                                  height: "80px",
                                  width: "80px",
                                  borderRadius: "50px",
                                }}
                              />
                            </Col>
                            <Col style={{}}>
                              <span style={{ fontSize: "20px", lineHeight: "60px" }}>{followers.name}</span>
                            </Col>
                          </Row>
                        );
                      }
                      return null; // Return null if user not found
                    })
                  : following.map((item, index) => {
                      // Find the user who is being followed
                      const followingUser = user.find((u) => u._id === item.userId);

                      // Check if a user was found
                      if (followingUser) {
                        return (
                          <Row key={index} style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.4)" }} className="mt-2">
                            <Col sm={3}>
                              <img
                                src={`http://localhost:8080/img/${followingUser.image}`}
                                alt="img"
                                style={{
                                  height: "80px",
                                  width: "80px",
                                  borderRadius: "50px",
                                }}
                              />
                            </Col>
                            <Col style={{}}>
                              <span style={{ fontSize: "20px", lineHeight: "60px" }}>{followingUser.name}</span>
                            </Col>
                          </Row>
                        );
                      }
                      return null; // Return null if user not found
                    })}
              </Card.Body>
            </Card>
          </Col>

          <Col></Col>
        </Row>
      </Container>
    </>
    )
}