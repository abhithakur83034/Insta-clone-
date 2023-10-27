"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card } from "react-bootstrap";
import NAVBAR from "../../NAVBAR";
import { useParams } from "next/navigation";

const Messagepage = () => {

const ids = useParams()
const id = ids.chat;
console.log("oaramid",id)

  const [follow, setFollow] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [search, setSearch] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/registereduser`)
      .then((res) => {
        const userData = res.data.message;
        setFollow(userData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
console.log("folow",follow)
  

  const [followbyme, setFollowbyme] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/followers`)
      .then((res) => {
        console.log(res.data)
        const userData = res.data
        const filterPost = userData.filter((item) => item.userId === id);
        setFollowbyme(filterPost);
      }).catch((error) => {
        console.log(error);
      });
  }, []);

console.log("follower",followbyme);

// const [chatperson, setChatperson] = useState([])
// useEffect(()=>{
//   setChatperson(follow.filter((item)=> item._id !== followbyme.userId))
// },[])
// console.log("chatperson", chatperson);

//for chat========================
const handleChat = (id) => {
  setSelectedUser(id);
};




//search input===================================

const handleSearch = (searchValue) => {
  const lowerSearchValue = searchValue.toLowerCase();
  if (!searchValue) {
    setSearch([]); // Clear the search results when the input is empty
  } else {
    setSearch(
      follow.filter((item) =>
        item.name.toLowerCase().includes(lowerSearchValue)
      )
    );
  }
};


  return (
    <>
      <NAVBAR />
      <Container>
        <Row className="mt-3">
          <Col sm={3} style={{ borderRight: "1px solid red" }}>
            <input
              type="search"
              className="form-control"
              placeholder="Search user..."
              onChange={(e) => handleSearch(e.target.value)}
            />
            {search === false ? (
              <p>No search input provided.</p>
            ) : search === true ? (
              <p>Searching...</p>
            ) : search.length > 0 ? (
              search.map((user) => (
                <span
                  key={user._id}
                  style={{
                    textDecoration: "none",
                    color: "black",
                    lineHeight: "50px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    handleChat(user._id);
                  }}
                >
                  <Card className="mt-3">
                    <Row key={user._id} className="mt-3">
                      <Col sm={3}>
                        <img
                          src={`http://localhost:8080/img/${user.image}`}
                          alt={user.name}
                          style={{
                            height: "50px",
                            width: "50px",
                            borderRadius: "50px",
                          }}
                        />
                      </Col>
                      <Col>{user.name}</Col>
                    </Row>
                  </Card>
                </span>
              ))
            ) : (
              ""
            )}

            <hr />
            {follow.map((user) => (
              <span
                style={{
                  textDecoration: "none",
                  color: "black",
                  lineHeight: "50px",
                  cursor: "pointer",
                }}
                onClick={() => {
                  handleChat(user._id);
                }}
              >
                <Card className={`mt-3`}>
                  <Row key={user._id} className="mt-3">
                    <Col sm={3}>
                      <img
                        src={`http://localhost:8080/img/${user.image}`}
                        alt={user.name}
                        style={{
                          height: "50px",
                          width: "50px",
                          borderRadius: "50px",
                        }}
                      />
                    </Col>
                    <Col>{user.name}</Col>
                  </Row>
                </Card>
              </span>
            ))}
          </Col>
          <Col>
            {selectedUser && (
              <div>
                <h1>
                  Chat with{" "}
                  {follow.find((user) => user._id === selectedUser).name}
                </h1>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Messagepage;
