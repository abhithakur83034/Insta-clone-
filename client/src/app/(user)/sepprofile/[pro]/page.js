"use client";
import React, { useEffect, useState } from "react";
import "../../style/profile.css";
import NAVBAR from "../../NAVBAR";
import axios from "axios";
import { Container, Row, Col, Card } from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const ProfilePage = ({ params }) => {
  const id = params.pro;
  // console.log(id);

  // let curruser;
  // if (typeof window !== 'undefined') {
  // const curruser = JSON.parse(localStorage.getItem("user"));
  // console.log("curruser",curruser)
  const [get, setGet] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/getpost")
      .then((res) => {
        // console.log(res.data.post);

        // Filter posts based on the user's _id
        const filterPost = res.data.post.filter((item) => item.userId === id);
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
        const filterPost = userData.filter((item) => item._id === id);

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

  // console.log(user);

  const [follow, setFollow] = useState([]);
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/followers`)
      .then((res) => {
        // console.log(res.data);
        const userData = res.data;
        const filterfollower = userData.filter((item) => item.userId === id);
        console.log(filterfollower)
        setFollow(filterfollower);
        const filterfollowing = userData.map((item) => item.following);
        console.log("filterfollowing",filterfollowing)
        const matchingIds = filterfollowing.map((item) => {
          // console.log(item);
          return item.includes(id);
        });

        console.log("Matching IDs:", matchingIds);
        const trueCount = matchingIds.filter((value) => value === true).length;

        console.log( trueCount);
        setFollowing(trueCount);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  console.log("follower", follow);
  console.log("following", following);





  console.log("get", get);

  const router = useRouter();
  const handleFollow = (ssf) => {
    console.log("ssf", ssf);
    router.push(`/sepshowfollower/${ssf}`);
  };

  return (
    <>
      <NAVBAR />
      <Container>
        <Row>
          <Col sm={2}></Col>
          <Col sm={8}>
            <Card>
              <Card.Title>
                <h2>{user.name}</h2>
              </Card.Title>
              <hr />
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
                        <Link
                          href=""
                          style={{ textDecoration: "none", color: "black" }}
                        >
                          <h3>Posts</h3>
                          <h5>{get.length}</h5>
                        </Link>
                      </Col>
                      <Col>
                        <span
                          style={{
                            textDecoration: "none",
                            color: "black",
                            cursor: "pointer",
                          }}
                          onClick={() => handleFollow(id)}
                        >
                           <h3>Following</h3>
                          <h5>
                            {follow.map((item) => (
                              <div key={item._id}>{item.following.length}</div>
                            ))}
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
                          onClick={() => handleFollow(id)}
                        ><h3>Followers</h3>
                         
                          <h5>{following}</h5>
                        </span>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <h3 style={{}}>{user.username}</h3>
                  </Col>
                  <Col></Col>
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
