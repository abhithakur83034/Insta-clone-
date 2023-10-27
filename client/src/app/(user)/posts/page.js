"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../style/profile.css";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";


const Post = () => {
  const [storie, setStorie] = useState([]);
  const [postr, setPostr] = useState([]);

  const localuser = JSON.parse(localStorage.getItem("user"));
  // console.log(localuser);

  const [loguser, setLoguser] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/registereduser`)
      .then((res) => {
        const userData = res.data.message;
        setStorie(userData);
        const filterLoguser = userData.filter(
          (item) => item._id === localuser._id
        );
        setLoguser(filterLoguser[0]); // Convert the array to an object by selecting the first element
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // console.log(loguser);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/getpost`)
      .then((res) => {
        const userData = res.data.post;
        setPostr(userData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  // console.log("poster",postr)

  const [postlike, setpostlike] = useState([]);
  const handleLike = async (post) => {
    try {
      const userId = post.userId;
      const postId = post._id;
      const likedBy = localuser._id;

      axios
        .post(
          `http://localhost:8080/api/like?userId=${userId}&postId=${postId}&likedBy=${likedBy}`,
          null,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          const result = res.data;
          console.log(result)
          if (result.status === "like") {
            toast.success("You like this Post");
            setpostlike("liked"); // Update the postlike state
            router.refresh();
          } else {
            toast.warning("You dislike this Post");
            setpostlike("disliked"); // Update the postlike state
            router.refresh();
          }
        })
        .catch((error) => {
          console.log(error);
          toast.error(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const [alllike, setAlllike] = useState([]);

  useEffect(() => {
    // Fetch data from the API to get all likes
    axios
      .get("http://localhost:8080/api/alllike")
      .then((res) => {
        const userData = res.data.allLike;
        // console.log('userData', userData);
        setAlllike(userData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  // console.log('alllike', alllike);

  const [following, setFollowing] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/followers`)
      .then((res) => {
        const userData = res.data;
        // console.log("userData", userData);
        const filterfollowing = userData.filter(
          (item) => item.followBy === localuser._id
        );
        setFollowing(filterfollowing);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //   console.log("following", following);

  // console.log("registeruser",storie)

  const router = useRouter();
  const handleUserClick = () => {
    router.push(`/storie`);
  };

  //comments==========================

  const handleComment=()=>{
    toast.info("clicked")
  }


// showStories==========================================================
const [show, setShow] = useState([])  
 useEffect(()=>{
  axios.get(`http://localhost:8080/api/allstories`)
  .then((res)=>{
  //  console.log(res.data.allstories)
   setShow(res.data.allstories)
  }).catch((error)=>{
   console.log(error.response.data)
  })
},[])

// console.log(show);

  return (
    <>
      <Container>
        <Row className="justify-content-center">
          <section
            className="highlights"
            style={{
              overflowX: "auto",
              whiteSpace: "nowrap",
              width: "600px",
              cursor: "pointer",
            }}
          >
            {
              <div className="highlight" onClick={handleUserClick}>
                <img
                  src={`http://localhost:8080/img/${loguser.image}`}
                  alt="Highlight"
                />
              </div>
            }
            {following &&
              following.map((story, index) => (
                <div key={index} className="highlight">
                  <img
                    src={`http://localhost:8080/img/${story.image}`}
                    alt="Highlight"
                  />
                  <span>{story.name}</span>
                </div>
              ))}
          </section>
        </Row>
        <Row>
          <Col style={{}}>
            {postr.map((post) => {
              // console.log("post",post)
              // Initialize user as null
              let user = null;

              // Find the user corresponding to the current post
              if (storie.length > 0) {
                user = storie.find((u) => u._id === post.userId);
              }

              if (alllike.length >= 0) {
                var likee = alllike.filter((l) => l.postId === post._id);
              }
              //  console.log(likee)

              let totalLikedByCount = null;
              if (likee.length > 0) {
                totalLikedByCount = likee.reduce(
                  (total, obj) => total + obj.likedBy.length,
                  0
                );
                // console.log(` ${totalLikedByCount}`);
              } else {
                // console.log("No likes found for the specified post.");
              }
              // Check if user is available
              if (user) {
                return (
                  <div className="card mt-5" key={post._id}>
                    <div className="card-header">
                      <div className="card-pic">
                        <img
                          src={`http://localhost:8080/img/${user.image}`}
                          alt={user.name}
                          style={{
                            borderRadius: "50%",
                            width: "50px",
                            height: "50px",
                          }}
                        />
                        <span
                          style={{ fontWeight: "bold", marginLeft: "10px" }}
                        >
                          <Link
                            href={`/sepprofile/${user._id}`}
                            style={{ textDecoration: "none", color: "black" }}
                          >
                            {user.name}
                          </Link>
                        </span>
                      </div>
                    </div>
                    <div
                      className="card-image m-3"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <img
                        src={`http://localhost:8080/img/${post.image}`}
                        alt=""
                        style={{ maxWidth: "400px", height: "400px" }}
                      />
                    </div>
                    <div>
                      {postlike === "liked" ? (
                        <i
                          className=""
                          style={{
                            fontSize: "x-large",
                            color: "red",
                            cursor: "pointer",
                          }}
                          onClick={() => handleLike(post)}
                        >
                          ❤
                        </i>
                      ) : (
                        <i
                          className=""
                          style={{
                            fontSize: "x-large",
                            // color: "darkgray",
                            cursor: "pointer",
                          }}
                          onClick={() => handleLike(post)}
                        >
                          🤍
                        </i>
                      )}
                       <i
                          className=""
                          style={{
                            fontSize: "x-large",
                            color: "darkgray",
                            cursor: "pointer",
                          }}
                          onClick={() => handleComment(post)}
                        >
                          💬
                        </i>
                        </div>
                      <div>
                      <h6 className="ms-2">Likes:{totalLikedByCount}</h6>
                      <h5  className="ms-2">{post.caption}</h5>
                      </div>
                    </div>
                );
              } else {
                // Render something while waiting for user data
                return (
                  <div className="card mt-5" key={post._id}>
                    Loading...
                  </div>
                );
              }
            })}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Post;
