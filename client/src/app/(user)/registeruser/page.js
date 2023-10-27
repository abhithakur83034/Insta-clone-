"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Button } from "react-bootstrap";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
const Registeruser = () => {
  const [user, setUser] = useState([]);
  const [active, setActive] = useState(null);

  const localuser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/registereduser`)
      .then((res) => {
        const userData = res.data.message;
        setUser(userData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const filterActive = user.find((u) => u._id === localuser._id);
    setActive(filterActive);
  }, [user, localuser]);
  // console.log("active",active);
  // Filter out the active user from the user list
  const usersToDisplay = user.filter((u) => u._id !== active?._id);



// Function to handle following a user
const [userfollow, setUserfollow] = useState([])
const handleFollowUser = (user) => {
  console.log(user)
  // alert("clicked")
  let userId = localuser._id;
  let following = user._id;
  let image = user.image;
  axios
    .post(`http://localhost:8080/api/follow?userId=${userId}&following=${following}&image=${image}`)
    .then((res) => {
      // console.log(res.data)
      if(res.data.status === "follow"){
        setUserfollow("follow")
        toast.success(`You are following : ${user.name} `)
      }else if(res.data.status === "unfollow"){
        
        setUserfollow("unfollow")
        toast.info(`Unfollowing : ${user.name} `)
      }
    })
    .catch((error) => {
      console.error(`Failed to follow user with ID: ${userId}`, error);
    });
};

const router = useRouter()
const handlePro=(id)=>{
  router.push(`/profile/${id}`)
}

  return (
    <Container>
      <Row className="mt-3">
        <Col>
            <span onClick={()=>{handlePro(active._id)}} style={{cursor:"pointer"}}>
          <Row>
          <Col sm={3} className="d-flex justify-content-end">
  {active && (
    <img
      src={`http://localhost:8080/img/${active.image}`}
      alt="Highlight"
      style={{
        height: "80px",
        width: "80px",
        borderRadius: "50%",
      }}
    />
  )}
</Col>

            <Col>
              {active && <h1 style={{ lineHeight: "80px"}}>{active.name}</h1>}
            </Col>
          </Row>
              </span>

          <hr />
          <Row>
            {usersToDisplay.map((users, index) => (
              <Row key={index} className="mt-3">
                <Col sm={2}>
                  <img
                    src={`http://localhost:8080/img/${users.image}`}
                    alt="Highlight"
                    style={{
                      height: "50px",
                      width: "50px",
                      borderRadius: "50px",
                    }}
                  />
                </Col>
                <Col>
                  <Link
                    href={`/sepprofile/${users._id}`}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <span style={{ fontSize: "20px", lineHeight: "40px" }}>
                      {users.name}
                    </span>
                  </Link>
                </Col>
                <Col>
                {/* {
                  userfollow === "follow" ?
                  <Button onClick={() => handleFollowUser(users)}>Unfollow</Button>
                  : */}
                  <Button onClick={() => handleFollowUser(users)}>Follow</Button>                  
                {/* } */}

                </Col>
              </Row>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Registeruser;
