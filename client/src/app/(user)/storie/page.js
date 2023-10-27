"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "axios";
import NAVBAR from "../NAVBAR";
import { Card, Container, Row, Col, Form } from "react-bootstrap";

const Storiespage = () => {
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  const [user, setUser] = useState([]);
  const [picture, setPicture] = useState(null);

  let curruser;
  if (typeof window !== "undefined") {
    curruser = JSON.parse(localStorage.getItem("user"));
  }

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

  const onSubmit = (data) => {
    const userId = curruser._id;
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("userId", userId);
    formData.append("image", data.image[0]);

    axios
      .post("http://localhost:8080/api/stories", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res.data.status);
        if (res.data.status === "success") {
          router.push("/home");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [file, setFile] = useState();

  function handleChange(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
  }



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
                  <b style={{ margin: "auto" }}>Add Stories</b>
                  <button
                    className="btn btn-outline-info"
                    style={{ fontSize: "15px" }}
                  >
                    Upload
                  </button>
                </Card.Title>
                <Card.Body>
                  <div className="formInstructionsDiv formElement">
                    <div>
                      <input
                        type="file"
                        accept="image/*"
                        name="image"
                        onChange={handleChange}
                        {...register("image", { required: true })}
                      />
                    </div>
                    <div className="previewProfilePic">
                      <img src={file} alt="Image Preview" />
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
                    alt="User Profile Pic"
                  />{" "}
                  <b style={{ marginLeft: "10px" }}>{user.name}</b>
                  <textarea
                    className="form-control mt-3"
                    placeholder="Write a title..."
                    name="title"
                    {...register("title", { required: true })}
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

export default Storiespage;
