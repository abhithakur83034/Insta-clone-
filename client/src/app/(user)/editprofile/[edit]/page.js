"use client"
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Card, Col, Container, Row } from "react-bootstrap";
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
const Editpage = () => {
    const sid = useParams()
    const id = sid.edit
     console.log(id);
    const { register, handleSubmit } = useForm();
    const [user, setUser] = useState([])
    const curruser = JSON.parse(localStorage.getItem("user"))
  const router = useRouter()
  useEffect(() => {
    axios.get(`http://localhost:8080/api/registereduser`)
      .then((res) => {
        const userData = res.data.message;
        const filteredUser = userData.filter((item) => item._id === curruser._id);
        setUser(filteredUser[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


    const onSubmit = (data) => {
        // console.log(data);
        const file = data.image[0];
        // console.log(file);
        const formData = new FormData();
        formData.append("image", file);
        formData.append("name", data.name);
        formData.append("mobile", data.mobile);
        formData.append("email", data.email);
        formData.append("address", data.address);
        formData.append("country", data.country);
        formData.append("about", data.about);
    
        axios
          .put(`http://localhost:8080/api/updateprofile/${id}`, formData)
          .then((res) => {
            console.log(res.data);
            localStorage.setItem("user", JSON.stringify(res.data));
            // toast.success("user data updated successfully");
            router.push('/home')
          })
          .catch((error) => {
            console.log(error);
            // toast.error(error.response);
          });
      };
  return (
    <>
              <Container>
                <Row>
                    <Col></Col>

                    <Col>
                    <Card>
                  <Card.Title style={{ textAlign: "center" }}><h3 className="head">Edit your profile</h3></Card.Title>
                  <hr />
                  <Card.Body>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="row mb-3">
                        <label
                          for="profileImage"
                          className="col-md-4 col-lg-3 col-form-label"
                        >
                          Profile Image
                        </label>
                        <div className="col-md-8 col-lg-9">
                          <img
                            src={`http://localhost:8080/img/${user.image}`}
                            style={{
                              borderRadius: "50%",
                              width: "150px",
                              height: "150px",
                            }}
                            alt=""
                          />
                          <div className="pt-2">
                            <input
                              type="file"
                              id="fileInput"
                              style={{ display: "none" }}
                              name="image"
                              {...register("image")}
                            />
                            <label
                              htmlFor="fileInput"
                              style={{ cursor: "pointer" }}
                            >
                              <span role="img" aria-label="Upload">
                                📁
                              </span>
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="row mb-3">
                        <label
                          for="fullName"
                          className="col-md-4 col-lg-3 col-form-label"
                        >
                         Name
                        </label>
                        <div className="col-md-8 col-lg-9">
                          <input
                            name="name"
                            type="text"
                            className="form-control"
                            id="fullName"
                            defaultValue={user.name}
                            {...register("name")}
                          />
                        </div>
                      </div>

                      <div className="row mb-3">
                        <label
                          for="fullName"
                          className="col-md-4 col-lg-3 col-form-label"
                        >
                        User Name
                        </label>
                        <div className="col-md-8 col-lg-9">
                          <input
                            name="username"
                            type="text"
                            className="form-control"
                            id="fullName"
                            defaultValue={user.username}
                            {...register("username")}
                          />
                        </div>
                      </div>

                      <div className="row mb-3">
                        <label
                          for="about"
                          className="col-md-4 col-lg-3 col-form-label"
                        >
                          About
                        </label>
                        <div className="col-md-8 col-lg-9">
                          <input
                          type='text'
                            name="about"
                            className="form-control"
                            id="about"
                            defaultValue={user.about}
                            {...register("about")}
                          />
                            
                        </div>
                      </div>

                      <div className="row mb-3">
                        <label
                          for="Country"
                          className="col-md-4 col-lg-3 col-form-label"
                        >
                          Country
                        </label>
                        <div className="col-md-8 col-lg-9">
                          <input
                            name="country"
                            type="text"
                            className="form-control"
                            id="Country"
                            defaultValue={user.country}
                            {...register("country")}
                          />
                        </div>
                      </div>

                      <div className="row mb-3">
                        <label
                          for="Address"
                          className="col-md-4 col-lg-3 col-form-label"
                        >
                          Address
                        </label>
                        <div className="col-md-8 col-lg-9">
                          <input
                            name="address"
                            type="text"
                            className="form-control"
                            id="Address"
                            defaultValue={user.address}
                            {...register("address")}
                          />
                        </div>
                      </div>

                      <div className="row mb-3">
                        <label
                          for="Phone"
                          className="col-md-4 col-lg-3 col-form-label"
                        >
                          Phone
                        </label>
                        <div className="col-md-8 col-lg-9">
                          <input
                            name="mobile"
                            type="text"
                            className="form-control"
                            id="mobile"
                            defaultValue={user.mobile}
                            {...register("mobile")}
                          />
                        </div>
                      </div>

                      <div className="row mb-3">
                        <label
                          for="Email"
                          className="col-md-4 col-lg-3 col-form-label"
                        >
                          Email
                        </label>
                        <div className="col-md-8 col-lg-9">
                          <input
                            name="email"
                            type="email"
                            className="form-control"
                            id="Email"
                            defaultValue={user.email}
                            {...register("email")}
                          />
                        </div>
                      </div>

                      <div className="text-center">
                        <button type="submit" className="btn btn-primary">
                          Save Changes
                        </button>
                      </div>
                    </form>
                  </Card.Body>
                </Card>
                    </Col>
                    
                    <Col></Col>
                </Row>
              </Container>
              </>
  )
}

export default Editpage