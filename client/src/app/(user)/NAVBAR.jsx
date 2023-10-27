"use client"
import Link from 'next/link';
import { Container, Nav, Navbar, Dropdown, NavDropdown } from 'react-bootstrap';
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import { useState,useEffect } from 'react';
import axios from 'axios'
function NAVBAR() {


  let user; // Declare 'user' outside of the if block

  if (typeof window !== 'undefined') {
    user = JSON.parse(localStorage.getItem("user"));
  }
  // console.log(user)
  const [singleuser, setSingleuser] = useState([]);

    useEffect(() => {
      axios
        .get(`http://localhost:8080/api/registereduser`)
        .then((res) => {
          // console.log(res.data.message);
          const userData = res.data.message;
          const filterPost = userData.filter((item) => item._id === user._id);
    
          if (filterPost.length === 1) {
            setSingleuser(filterPost[0]); 
          } else {
            console.log("User not found or multiple users found.");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }, []);
  
  // console.log(singleuser);

  

const router = useRouter()

  const handleProfile=(id)=>{
   router.push(`/profile/${id}`)
  }

  

  const handlePost=(id)=>{
    router.push(`/post`)
  }

  const handleMessage = (chat) => {
    router.push(`/message/${chat}`);
  }
  
  



  return (
    <Navbar expand="lg" className="bg-body-tertiary" style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.1)" }}
    >
      <Container >
        <Navbar.Brand href="#home">
          <Link href="/home">
            <div >
              <Image
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRy57NIobf2Tszx0d2mNr7UwWcsUI71jgsp-Q&usqp=CAU"
                height={50}
                width={200}
                style={{
                  width: "70%",
                  height: "50px",
                }}
              />
            </div>

          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            <Nav>
              <Link href="/home" style={{ textDecoration: "none", paddingRight: "30px" }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-house" viewBox="0 0 16 16" style={{ width: "30px", height: "30px" }}>
                  <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5ZM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5 5 5Z" />
                </svg>
              </Link>

              <span style={{ textDecoration: "none", paddingRight: "30px", cursor:"pointer" }} onClick={()=>{handleMessage(user._id)}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-chat" viewBox="0 0 16 16" style={{ width: "30px", height: "30px" }}>
                  <path d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.720.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.520.263-1.639.742-3.468 1.105z" />
                </svg>
              </span>

              <span style={{ textDecoration: "none", paddingRight: "30px", cursor:"pointer" }} onClick={()=>{handlePost(user._id)}} >
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-plus-square" viewBox="0 0 16 16" style={{ width: "30px", height: "30px" }}>
                  <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 0-.5z" />
                </svg>
              </span>

              <Link href="/reels" style={{ textDecoration: "none", paddingRight: "30px" }} >
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-compass" viewBox="0 0 16 16" style={{ width: "30px", height: "30px" }}>
                  <path d="M8 16.016a7.5 7.5 0 0 0 1.962-14.74A1 1 0 0 0 9 0H7a1 1 0 0 0-.962 1.276A7.5 7.5 0 0 0 8 16.016zm6.5-7.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z" />
                  <path d="m6.94 7.44 4.95-2.83-2.83 4.95-4.949 2.83 2.828-4.95z" />
                </svg>
              </Link>

              <Link href="" style={{ textDecoration: "none", paddingRight: "30px" }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-heart" viewBox="0 0 16 16" style={{ width: "30px", height: "30px" }}>
                  <path d="M8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.920 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                </svg>
              </Link>
              {/* <Dropdown align={{ lg: "start" }}>
              <Dropdown.Toggle
                style={{
                  display: "contents",
                  background: "rgba(0,212,255,1)",
                  border: "rgba(0,212,255,1)",
                }}
                id="dropdown-basic"
              > */}
               
                <span  onClick={()=>{handleProfile(user._id)}} style={{cursor:"pointer"}}>
                <img
                   src={`http://localhost:8080/img/${singleuser.image}`}
                  style={{
                    borderRadius: "50%",
                    width: "50px",
                    height: "50px",
                  }}
                  alt=""
                />
                </span>
              {/* </Dropdown.Toggle>
              <Dropdown.Menu align="end">
                <Dropdown.Item >
                  <i className="bi bi-person"></i>
                 Profile

                </Dropdown.Item>
                <Dropdown.Item>
                  <i className="bi bi-phone"></i>
                  
                </Dropdown.Item>
                <NavDropdown.Divider />
                <Dropdown.Item
                  onClick={() => {
                    handeledit(user._id);
                  }}
                >
                  <i className="bi bi-gear"></i>Edit Profile
                </Dropdown.Item>
                
              </Dropdown.Menu>
            </Dropdown> */}
              {/* <span className="d-flex align-items-center">
                <img
                  src="/img/s2.jpg"
                  alt="User Avatar"
                  className="rounded-circle mr-2"
                  style={{ width: '40px', height: '40px', cursor:"pointer" }}
                  onClick={()=>{handleProfile(user._id)}}
                />
              </span> */}
             
             
            </Nav>

          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>


  );
}

export default NAVBAR;