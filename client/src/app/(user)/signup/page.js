"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Card, Col, Container, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import "../style/insta.css";
import axios from "axios";

const Signup = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    axios.post("http://localhost:8080/api/usrregister",data)
    .then((res)=>{
      console.log(res.data);
      if(res.data.status === "success"){
        alert("ADDED")
      }
    }).catch((error)=>{
      console.log(error)
    })
    console.log(data);
  };
  return (
    <>
      <Container fluid>
        <Row className="">
          <Col></Col>
          <Col className="mt-3">
            <Card style={{ marginLeft: "70px", marginRight: "70px" }}>
              <Card.Title>
                <Link href="">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRy57NIobf2Tszx0d2mNr7UwWcsUI71jgsp-Q&usqp=CAU"
                      objectFit="contain"
                      height={100}
                      width={200}
                      style={{
                        borderRadius: "1rem",
                        borderColor: "#fff",
                        borderWidth: "6px",
                        width: "50%",
                        height: "100px",
                        marginTop: "20px",
                      }}
                    />
                  </div>
                </Link>
                <div style={{ textAlign: "center" }}>
                  <span style={{ fontSize: "18px", color: "#737573" }}>
                    Sign up to see photos and videos from your friends.
                  </span>
                </div>
              </Card.Title>

              <Form>
                <Card.Body>
                  <p>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email"
                      name="email"
                      {...register('email')}
                    />
                  </p>
                  <p>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Full Name"
                      name="name"
                      {...register('name')}
                    />
                  </p>
                  <p>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="UserName"
                      name="username"
                      {...register('username')}
                    />
                  </p>
                  <p>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      name="password"
                      {...register('password')}
                    />
                  </p>

                  <div>
                    <p style={{ textAlign: "center", fontSize: "14px" }}>
                      People who use our service may have uploaded your contact
                      information to Instagram.{" "}
                      <Link href="https://example.com/learn-more">
                        Learn More
                      </Link>
                    </p>
                  </div>
                  <div>
                    <p style={{ textAlign: "center", fontSize: "14px" }}>
                      By signing up, you agree to our{" "}
                      <Link href="/terms">Terms</Link>,{" "}
                      <Link href="/privacy-policy">Privacy Policy</Link>, and{" "}
                      <Link href="/cookies-policy">Cookies Policy</Link>.
                    </p>
                  </div>

                  <p>
                    <button
                      type="submit"
                      onClick={handleSubmit(onSubmit)}
                      className="form-control btn btn-info"
                    >
                      Sign Up
                    </button>
                  </p>
                </Card.Body>
              </Form>
            </Card>
            <Card
              style={{ marginLeft: "70px", marginRight: "70px" }}
              className="mt-3"
            >
              <p style={{ textAlign: "center", paddingTop: "5px" }}>
                have an account?{" "}
                <Link
                  href="/"
                  style={{
                    textDecoration: "none",
                    fontSize: "13px",
                    marginRight: "10px",
                    color: "#00a1f5",
                  }}
                >
                  Log In
                </Link>
              </p>
            </Card>
            <Row className="mt-3">
              <center>
                <span>Get the app</span>
              </center>
              <Col>
                <center>
                  <Link href="">
                    <Image
                      src="data:image/png;base64,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"
                      width={150}
                      height={60}
                    />
                  </Link>
                  <Link href="">
                    <Image
                      src="data:image/png;base64,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"
                      width={150}
                      height={44}
                      style={{
                        borderRadius: "10px",
                      }}
                    />
                  </Link>
                </center>
              </Col>
            </Row>
          </Col>
          <Col></Col>
        </Row>
        <Row style={{ marginTop: "50px", minHeight:"100px" }}>
          <Col style={{ textAlign: "center" }}>
            <span>
              {" "}
              <Link
                href="https://about.meta.com/"
                style={{
                  textDecoration: "none",
                  fontSize: "13px",
                  marginRight: "10px",
                  color: "#737573",
                }}
              >
                Meta
              </Link>
            </span>
            <span>
              {" "}
              <Link
                href="https://about.instagram.com/"
                style={{
                  textDecoration: "none",
                  fontSize: "13px",
                  marginRight: "10px",
                  color: "#737573",
                }}
              >
                About
              </Link>
            </span>
            <span>
              {" "}
              <Link
                href="https://about.instagram.com/en_US/blog"
                style={{
                  textDecoration: "none",
                  fontSize: "13px",
                  marginRight: "10px",
                  color: "#737573",
                }}
              >
                {" "}
                Blog
              </Link>
            </span>
            <span>
              {" "}
              <Link
                href="https://about.instagram.com/about-us/careers"
                style={{
                  textDecoration: "none",
                  fontSize: "13px",
                  marginRight: "10px",
                  color: "#737573",
                }}
              >
                {" "}
                Jobs
              </Link>
            </span>
            <span>
              {" "}
              <Link
                href="https://help.instagram.com/"
                style={{
                  textDecoration: "none",
                  fontSize: "13px",
                  marginRight: "10px",
                  color: "#737573",
                }}
              >
                {" "}
                Help
              </Link>
            </span>
            <span>
              {" "}
              <Link
                href="https://developers.facebook.com/docs/instagram"
                style={{
                  textDecoration: "none",
                  fontSize: "13px",
                  marginRight: "10px",
                  color: "#737573",
                }}
              >
                {" "}
                API
              </Link>
            </span>
            <span>
              {" "}
              <Link
                href="https://privacycenter.instagram.com/policy/?entry_point=ig_help_center_data_policy_redirect"
                style={{
                  textDecoration: "none",
                  fontSize: "13px",
                  marginRight: "10px",
                  color: "#737573",
                }}
              >
                {" "}
                Privacy
              </Link>
            </span>
            <span>
              {" "}
              <Link
                href="https://help.instagram.com/581066165581870/"
                style={{
                  textDecoration: "none",
                  fontSize: "13px",
                  marginRight: "10px",
                  color: "#737573",
                }}
              >
                {" "}
                Terms
              </Link>
            </span>
            <span>
              {" "}
              <Link
                href="https://www.instagram.com/explore/locations/"
                style={{
                  textDecoration: "none",
                  fontSize: "13px",
                  marginRight: "10px",
                  color: "#737573",
                }}
              >
                {" "}
                Locations
              </Link>
            </span>
            <span>
              {" "}
              <Link
                href="https://www.instagram.com/web/lite/"
                style={{
                  textDecoration: "none",
                  fontSize: "13px",
                  marginRight: "10px",
                  color: "#737573",
                }}
              >
                {" "}
                Instagram Lite
              </Link>
            </span>
            <span>
              {" "}
              <Link
                href="https://www.threads.net/login"
                style={{
                  textDecoration: "none",
                  fontSize: "13px",
                  marginRight: "10px",
                  color: "#737573",
                }}
              >
                {" "}
                Threads
              </Link>
            </span>
            <span>
              {" "}
              <Link
                href="https://www.facebook.com/help/instagram/261704639352628"
                style={{
                  textDecoration: "none",
                  fontSize: "13px",
                  marginRight: "10px",
                  color: "#737573",
                }}
              >
                {" "}
                Contact Uploading & Non-Users
              </Link>
            </span>
            <span>
              {" "}
              <Link
                href="https://about.meta.com/technologies/meta-verified/"
                style={{
                  textDecoration: "none",
                  fontSize: "13px",
                  marginRight: "10px",
                  color: "#737573",
                }}
              >
                {" "}
                Meta Verified
              </Link>
            </span>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Signup;
