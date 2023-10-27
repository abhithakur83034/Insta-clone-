"use client"
import React, { useState,useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "axios";
import NAVBAR from "../NAVBAR";
import { Card, Container, Row, Col, Form } from "react-bootstrap";

const Postpage = () => {
  const { register, handleSubmit, setValue } = useForm();
  const router = useRouter();

  const [user, setUser] = useState([]);
  const [picture, setPicture] = useState('');


  
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/registereduser`)
      .then((res) => {
        const userData = res.data.message;
        const filteredUser = userData.filter(
          (item) => item._id === curruser._id
        );
        setUser(filteredUser[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  // console.log(user)


  let curruser;
  if (typeof window !== 'undefined') {
    curruser = JSON.parse(localStorage.getItem("user"));
  }
  const userId = curruser._id;

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("image", data.image[0]);
    formData.append("caption", data.caption);
    formData.append("userId", userId);

    try {
      const response = await axios.post("http://localhost:8080/api/createpost", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.status === "success") {
        router.push("/home");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const loadfile = (event) => {
    var output = document.getElementById("output");
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function () {
      URL.revokeObjectURL(output.src); // free memory
    };
  };

  return (
    <>
      <NAVBAR />
      <Container>
        <Row>
          <Col sm={3}></Col>
          <Col>
            <Form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
              <Card>
              <Card.Title
                  style={{
                    borderBottom: "1px solid black",
                    display: "flex",
                    justifyContent: "space-between",
                    height: "50px",
                    lineHeight: "50px",
                  }}
                >
                  <b style={{ margin: "auto" }}>Create New Post</b>
                  <button
                    className="btn btn-outline-info"
                    style={{ fontSize: "15px" }}
                  >
                    Share
                  </button>
                </Card.Title>
                {/* <hr/> */}
                <Card.Body>
                <div className="formInstructionsDiv formElement">
              <div>
                 {/* <input id="profilePic" type="file"  name="image" accept="image/*" {...register("image",{required:true})}/> */}
                 <input
          type="file"
          accept="image/*"
          onChange={(event) => {
            loadfile(event);
          }}
          {...register("image",{required:true})}
        />
              </div>
              <div className="previewProfilePic" >
                <img className="playerProfilePic_home_tile"  src={picture} alt="image"></img>
              </div>
            </div>
                </Card.Body>
                <Card.Footer>
                  <img
                    src={`http://localhost:8080/img/${user.image}`}
                    style={{
                      borderRadius: "50%",
                      width: "50px",
                      height: "50px",
                    }}
                    alt=""
                  />{" "}
                  <b style={{ marginLeft: "10px" }}>{user.name}</b>
                  <textarea
                    className="form-control mt-3"
                    placeholder="write a caption..."
                    name="caption"
                    {...register("caption",{required:true})}
                  ></textarea>
                </Card.Footer>
              </Card>
            </Form>
          </Col>

          <Col sm={3}></Col>
        </Row>
      </Container>
    </>
  );
};

export default Postpage;
