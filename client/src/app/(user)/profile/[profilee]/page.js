"use client";
import React, { useEffect, useState } from "react";
import "../../style/profile.css";
import NAVBAR from "../../NAVBAR";
import axios from "axios";
import { Container, Row, Col, Card, Dropdown, Button } from "react-bootstrap";
import { useRouter } from "next/navigation";
import { deleteCookie } from "cookies-next";

const ProfilePage = ({ params }) => {
  const id = params.profilee;
  // console.log(id);

  // let curruser;
  // if (typeof window !== 'undefined') {
  const curruser = JSON.parse(localStorage.getItem("user"));
  // console.log("curruser",curruser)
  const [get, setGet] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/getpost")
      .then((res) => {
        // console.log(res.data.post);

        // Filter posts based on the user's _id
        const filterPost = res.data.post.filter(
          (item) => item.userId === curruser._id
        );
        // console.log("filterpost",filterPost)
        // Update state with filtered posts
        setGet(filterPost);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // console.log("get",get);

  const [user, setUser] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/registereduser`)
      .then((res) => {
        // console.log(res.data.message);
        const userData = res.data.message;
        const filterPost = userData.filter((item) => item._id === curruser._id);

        if (filterPost.length === 1) {
          setUser(filterPost[0]);
        } else {
          console.log("User not found or multiple users found.");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // console.log(user.image);

  const [follow, setFollow] = useState([]);
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/followers`)
      .then((res) => {
        // console.log(res.data);
        const userData = res.data;
        const filterfollower = userData.filter((item) => item.userId === id);
        setFollow(filterfollower);
        const filterfollowing = userData.map((item) => item.following );
// console.log("filterfollowing",filterfollowing)
const matchingIds = filterfollowing.map((item) => {
  // console.log(item);
  return item.includes(id);
});

// console.log("Matching IDs:", matchingIds);
const trueCount = matchingIds.filter((value) => value === true).length;

console.log("Number of true values in matchingIds:", trueCount);
setFollowing(trueCount);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // console.log("follower", follow);
  // console.log("following", following);

  const router = useRouter();
  const handleFollow = (folllow) => {
    // console.log(folllow)
    const id = follow.followBy;
    router.push(`/showfollower`);
  };

  const Logout = () => {
    localStorage.clear();
    deleteCookie("logged");
    router.push("/");
  };


  const handeledit=(id)=>{
    router.push(`/editprofile/${id}`)
   }

  const handleArch=(id)=>{
    router.push(`/archive/${id}`)
   }



  return (
    <>
      <NAVBAR />
      
      <Container className="mt-2">
        <Row>
          <Col sm={2}></Col>
          <Col sm={8}>
            <Card>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "35px",
                  borderBottom: "1px solid rgba(0, 0, 0, 0.4)",
                }}
              >
                <span className="ms-3">{user.name}</span>
                <Dropdown align={{ lg: "start" }}>
                  <Dropdown.Toggle
                    id="dropdown-basic"
                    style={{
                      background: "white",
                      border: "rgba(0,212,255,1)",
                    }}
                  >
                    <span
                      className=""
                      style={{
                        color: "red",
                        cursor: "pointer",
                        fontSize: "35px",
                      }}
                    >
                      ⚙
                    </span>
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="#">Setting & Privacy</Dropdown.Item>
                    <Dropdown.Item href="#">Your activity</Dropdown.Item>
                    <Dropdown.Item onClick={()=>handleArch(id)} style={{cursor:"pointer"}}>Archive</Dropdown.Item>
                    <Dropdown.Item href="#">QR code</Dropdown.Item>
                    <Dropdown.Item href="#">Saved</Dropdown.Item>
                    <Dropdown.Item href="#">Close Friends</Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        Logout();
                      }}
                    >
                      LogOut
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>

              <Card.Title></Card.Title>
              <Card.Body>
                <Row>
                  <Col sm={3} className="profile-picture">
                    <img
                      src={`http://localhost:8080/img/${user.image}`}
                      alt="Profile Picture"
                    />
                  </Col>
                  {/*  */}
                  <Col>
                    <Row>
                      <Col>
                        <span
                          style={{
                            textDecoration: "none",
                            color: "black",
                            cursor: "pointer",
                          }}
                        >
                          <h3>Posts</h3>
                          <h5>{get.length}</h5>
                        </span>
                      </Col>
                      <Col>
                        <span
                          style={{
                            textDecoration: "none",
                            color: "black",
                            cursor: "pointer",
                          }}
                          onClick={() => handleFollow()}
                        >
                          <h3>Followers</h3>
                          <h5>
                            {following}
                          </h5>
                        </span>
                      </Col>
                      <Col>
                        <span
                          style={{
                            textDecoration: "none",
                            color: "black",
                            cursor: "pointer",
                          }}
                          onClick={() => handleFollow()}
                        >
                          <h3>Following</h3>
                          <h5>
                            {follow.map((item) => (
                              <div key={item._id}>{item.following.length}</div>
                            ))}
                          </h5>
                        </span>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <h3 className="mt-2" style={{}}>
                      {user.username}
                    </h3>
                  </Col>
                  <Col></Col>
                </Row>
                <Row>
                  <Col>
                  <Button variant="info"  onClick={() => {handeledit(id)}} >Edit Profile</Button>
                  </Col>
                </Row>
                <Row>
                  <Col
                    className="highlights"
                    style={{ overflowX: "auto", whiteSpace: "nowrap" }}
                  >
                    <h2>Highlights</h2>
                    <div className="highlight">
                      <img src="/img/s2.jpg" alt="Highlight" />
                      <span>Travel</span>
                    </div>
                    <div className="highlight">
                      <img src="/img/s2.jpg" alt="Highlight" />
                      <span>Travel</span>
                    </div>
                    <div className="highlight">
                      <img src="/img/s2.jpg" alt="Highlight" />
                      <span>Travel</span>
                    </div>
                    <div className="highlight">
                      <img src="/img/s2.jpg" alt="Highlight" />
                      <span>Travel</span>
                    </div>
                  </Col>
                </Row>

                <Row xs={1} md={3} className="g-4">
                  {get.map((item, idx) => (
                    <Col key={idx}>
                      <Card>
                        <Card.Img
                          variant="top"
                          src={`http://localhost:8080/img/${item.image}`}
                          style={{
                            height: "300px",
                            width: "255px",
                          }}
                        />
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={2}></Col>
        </Row>
      </Container>
    </>
  );
};

export default ProfilePage;
