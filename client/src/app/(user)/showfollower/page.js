"use client"
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Container, Row, Col } from "react-bootstrap";
import NAVBAR from "../NAVBAR";

const Followerpage = () => {
  
  const curruser = JSON.parse(localStorage.getItem("user"));   // Get the currently logged-in user's ID from local storage
  const id = curruser._id;

  
  const [follow, setFollow] = useState([]);  // State to store the followers and following lists
  const [following, setFollowing] = useState([]);

  const [viewingFollowers, setViewingFollowers] = useState(true);    // State to manage whether we're viewing followers or following


  // Fetch the list of followers and following when the component mounts
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/followers`)
      .then((res) => {
        const userData = res.data;
        console.log(userData);
        const filterfolloing = userData.filter((item) => item.userId === id);
        // console.log(filterfollower)
        const filterfollowing = filterfolloing.map((item) => item.following );
        // console.log(filterfollowing)
        setFollowing(filterfollowing)

        const followingIds = userData.map((item) => item.following).flat();
        console.log(followingIds);
        

        setFollow(followingIds)
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  // console.log(following)
  console.log(follow)


  // Fetch user data when the component mounts
  const [user, setUser] = useState([]);
  const [loguser, setLoguser] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/registereduser`)
      .then((res) => {
        const userData = res.data.message;
        setUser(userData);
        const filterLoguser = userData.filter((item) => item._id === id);
        setLoguser(filterLoguser[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);
// console.log(user)

const followingDetails = following
  .map((item) =>
    item.map((Id) => {
      // Find the user who is being followed
      const getFollower = user.find((f) => f._id === Id);
      return getFollower;
    })
  )
  .flat(); // Flatten the nested arrays

console.log(followingDetails);
  return (
    <>
      <NAVBAR />
      <Container fluid>
        <Row className="mt-3">
          <Col></Col>
          <Col>
            <Card>
              <span
                style={{
                  fontSize: "20px",
                  borderBottom: "1px solid rgba(0, 0, 0, 0.4)",
                }}
              >
                {loguser.name}
              </span>
              <Card.Title>
                <Row style={{ textAlign: "center" }}>
                  <Col
                    onClick={() => setViewingFollowers(true)}
                    style={{
                      cursor: "pointer",
                      position: "relative",
                    }}
                  >
                    Following
                    {viewingFollowers && (
                      <div
                        style={{
                          position: "absolute",
                          bottom: "0",
                          left: "50%",
                          top: "25px",
                          transform: "translateX(-50%)",
                          width: "10px",
                          height: "10px",
                          background: "red",
                          borderRadius: "50%",
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
                    Follower
                    {!viewingFollowers && (
                      <div
                        style={{
                          position: "absolute",
                          bottom: "0",
                          left: "50%",
                          top: "25px",
                          transform: "translateX(-50%)",
                          width: "10px",
                          height: "10px",
                          background: "red",
                          borderRadius: "50%",
                        }}
                      ></div>
                    )}
                  </Col>
                </Row>
              </Card.Title>
              <Card.Body>
                {viewingFollowers
                  ? followingDetails.map((item, index) => (
                    <div key={index}>
                      <Row
                        style={{
                          borderBottom: "1px solid rgba(0, 0, 0, 0.4)",
                        }}
                        className="mt-2"
                      >
                        <Col sm={3}>
                          <img
                            // src={`http://localhost:8080/img/${item.image}`}
                            alt="img"
                            style={{
                              height: "80px",
                              width: "80px",
                              borderRadius: "50px",
                            }}
                          />
                        </Col>
                        <Col>
                          <span style={{ fontSize: "20px", lineHeight: "60px" }}>
                            {/* {item.name} */}
                          </span>
                        </Col>
                      </Row>
                    </div>
                  ))                  
                  : following.map((item, index) => {
                      // Find the user who is being followed
                      const followings = item.map((Id) => {
                        const getFollower = user.filter((f) => f._id === Id);
                        console.log("following", getFollower);
                        return getFollower; // Return the filtered result
                      });
                      
                      
                      
    
                      console.log(followings);
    
                      // Check if a user was found
                      if (following) {
                        return (
                          <Row
                            key={index}
                            style={{
                              borderBottom: "1px solid rgba(0, 0, 0, 0.4)",
                            }}
                            className="mt-2"
                          >
                            <Col sm={3}>
                              <img
                                // src={`http://localhost:8080/img/${followingUser.image}`}
                                alt="img"
                                style={{
                                  height: "80px",
                                  width: "80px",
                                  borderRadius: "50px",
                                }}
                              />
                            </Col>
                            <Col style={{}}>
                              <span
                                style={{ fontSize: "20px", lineHeight: "60px" }}
                              >
                                {/* {followingUser.name} */}
                              </span>
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
  );
};

export default Followerpage;
