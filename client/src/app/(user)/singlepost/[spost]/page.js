"use client"
import React, { useEffect, useState } from 'react';
import { useParams } from "next/navigation";
import axios from 'axios';
import {Container,Row, Col,Card} from 'react-bootstrap';
import Link from 'next/link'
import NAVBAR from "../../NAVBAR";
const SinglePostpage = () => {
    const ids = useParams()
    const id = ids.spost;
    console.log(id)

    const [get, setGet] = useState([]); 
    const [reguser, setReguser] = useState([]); 
  
    useEffect(() => {
      axios
        .get(`http://localhost:8080/api/registereduser`)
        .then((res) => {
          const userData = res.data.message;
          setReguser(userData);
        })
        .catch((error) => {
          console.log(error);
        });
    }, []);
  

    useEffect(() => {
      axios
        .get("http://localhost:8080/api/getpost")
        .then((res) => {
          // console.log(res.data.post);
    
          // Filter posts based on the user's _id
          const filterPost = res.data.post.filter((item) => item._id === id);
    // console.log("filterpost",filterPost)
          // Update state with filtered posts
          setGet(filterPost);
        })
        .catch((error) => {
          console.log(error);
        });
    }, []);
    
    console.log("get",get);
  return (
    <>
    <NAVBAR/>
    <Container>
        <Row>
            <Col sm={3}>
            {/* <Row xs={1} md={3} lg={4} className="g-1 mt-3">
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
</Row> */}</Col>
 <Col sm={6} style={{}}>
            {get.map((post) => {
              console.log("post",post)
              // Initialize user as null
              let user = null;

              // Find the user corresponding to the current post
              if (reguser.length > 0) {
                user = reguser.find((u) => u._id === post.userId);
              }

              // Check if user is available
              if (user) {
                return (
                  <div className="card mt-5" key={post._id}>
                    <div className="card-header">
                      <div className="card-pic">
                        <img
                          src={`http://localhost:8080/img/${user.image}`}
                          alt={user.name}
                          style={{
                            borderRadius: "50%",
                            width: "50px",
                            height: "50px",
                          }}
                        />
                        <span
                          style={{ fontWeight: "bold", marginLeft: "10px" }}
                        >
                          <Link
                            href={`/sepprofile/${user._id}`}
                            style={{ textDecoration: "none", color:"black" }}
                          >
                            {user.name}
                          </Link>
                        </span>
                      </div>
                    </div>
                    <div
                      className="card-image m-3"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <img
                        src={`http://localhost:8080/img/${post.image}`}
                        alt=""
                        style={{ maxWidth: "400px", height: "400px" }}
                      />
                    </div>
                    <div className="ms-2">
                    <span style={{ textDecoration: "none", paddingRight: "10px", cursor:"pointer" }} onClick={() => handleLike(post)} >
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-heart" viewBox="0 0 16 16" style={{ width: "25px", height: "25px"}}>
                  <path d="M8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.920 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                </svg>
                
              </span>
              <span style={{ textDecoration: "none", cursor:"pointer" }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-chat" viewBox="0 0 16 16" style={{ width: "27px", height: "27px"}}>
                  <path d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.720.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.520.263-1.639.742-3.468 1.105z" />
                </svg>
              </span>
                      <h5 >{post.caption}</h5>
                      </div>
                  </div>
                );
              } else {
                // Render something while waiting for user data
                return (
                  <div className="card mt-5" key={post._id}>
                    Loading...
                  </div>
                );
              }
            })}
          </Col>

           <Col sm={3}> </Col>
        </Row>
    </Container>
    </>
  )
}

export default SinglePostpage