import React, { useEffect, useState } from "react";
import { Carousel } from "react-carousel-minimal";
import "react-toastify/dist/ReactToastify.css";
import MenuBar from "../components/MenuBar";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";

const data = [
  {
    image: "/indoor-bike.svg",
    caption: "Discover our professional gym equipment",
  },
  {
    image: "/stability-ball.svg",
    caption: "Find your balance",
  },
  {
    image: "/pt-history.svg",
    caption: "Get help from our trainers",
  },
  {
    image: "/current-location.svg",
    caption: "Find the nearest club to you",
  },
  {
    image: "/mindfulness.svg",
    caption: "Relax your mind",
  },
  {
    image: "/workout.svg",
    caption: "Enjoy the workout",
  },
];

const captionStyle = {
  fontSize: "25px",
  color: "white",
};

const Home = () => {
  const accessToken = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  const [name, setName] = useState();
  useEffect(() => {
    getCurrentUser();
  }, []);

  const getCurrentUser = () => {
    try {
      fetch(`http://localhost:8080/api/user`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        method: "get",
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject("Cannot get current user.");
        })
        .then((data) => {
          setName(data.firstname + " " + data.lastname);
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="parent">
      <MenuBar></MenuBar>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <div
          style={{
            "box-shadow": "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
            padding: "3px",
          }}
        >
          <p
            style={{
              "font-size": "120%",
              "font-weight": "bold",
              "margin-left": "15px",
              color: "#006E7F",
            }}
          >
            Welcome to Fit & Repeat
          </p>
        </div>
        <div className="child">
          <div
            style={{
              marginTop: "30px",
              display: "flex",
              padding: "20px",
              flexDirection: "column",
              justifyContent:"center",
            }}
          >
            {name && (
              <div
                style={{
                  "font-size": "170%",
                  "font-weight": "bold",
                  color: "#006E7F",
                }}
              >
                Welcome to Fit & Repeat,{" "}
                <b style={{ color: "#EE5007" }}>{name}</b> !
              </div>
            )}
            <Carousel
              data={data}
              time={2000}
              width="1000px"
              height="300px"
              captionStyle={captionStyle}
              radius="10px"
              // slideNumber={true}
              // slideNumberStyle={slideNumberStyle}
              captionPosition="bottom"
              automatic={true}
              // dots={true}
              // pauseIconColor="white"
              // pauseIconSize="40px"
              // slideBackgroundColor="darkgrey"
              slideImageFit="contain"
              // thumbnails={true}
              // thumbnailWidth="100px"
              style={{
                // textAlign: "center",
                // maxWidth: "850px",
                marginLeft: "20%",
                // marginRight:"auto",
                marginTop: "50px",
                // maxHeight: "500px",
                // margin: "0 auto",
                // margin: "40px auto",
              }}
            />
            <div style={{
              display: "flex", justifyContent: "space-between", marginTop: "30px",width:"90%",marginLeft:"auto",marginRight:"auto"
            }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "45%",
                  padding: "30px",
                  justifyContent: "flex-start",
                  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                }}
              >
                <p
                  style={{
                    "font-size": "150%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  {/* <b style={{ color: "#EE5007" }}>Fit & Repeat</b>
                <b style={{ color: "#006E7F" }}>
                  : Uniting fitness enthusiasts worldwide
                </b> */}
                  <b style={{ color: "#006E7F" }}> Unleash Your Potential, </b>
                  &nbsp;
                  <b style={{ color: "#EE5007" }}>Transform Your Body!</b>
                </p>
                <p
                  align="left"
                  style={{
                    color: "#006E7F",
                    display: "flex",
                    justifyContent: "flex-start",
                    "font-size": "120%",
                    textAlign: "justify",

                  }}
                >
                  Invest in your health and well-being today because you deserve
                  to look and feel your best. Start your fitness journey with us
                  and experience the transformative power of exercise. Unleash
                  your potential, surpass your limitations, and embark on a
                  life-changing adventure that will redefine what you thought
                  was possible.
                </p>
                {/* <p
                align="left"
                style={{
                  color: "#006E7F",
                  display: "flex",
                  justifyContent: "center",
                  "font-size": "120%",
                  textAlign: "justify",
                  fontWeight: "bold",
                }}
              >
                Start with your membership
              </p> */}
                <div
                  style={{
                    marginTop: "10px",
                    // display: "flex"
                  }}
                >
                  <Button
                    style={{
                      backgroundColor: "#B22727",
                      color: "white",
                      padding: "8px",
                      fontSize: "18px",
                      height: "100%",
                      width: "200px",
                      fontFamily: "'Montserrat',sans-serif",
                    }}
                    onClick={() => {
                      navigate("/buy-membership");
                    }}
                  >
                    Buy membership
                  </Button>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "45%",
                  padding: "30px",
                  justifyContent: "flex-start",
                  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                }}
              >
                <p
                  style={{
                    "font-size": "150%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <b style={{ color: "#EE5007" }}> Maximize your fitness. </b>
                  &nbsp;
                  <b style={{ color: "#006E7F" }}>
                    Train with a Personal Trainer!
                  </b>
                </p>
                <p
                  align="left"
                  style={{
                    color: "#006E7F",
                    display: "flex",
                    justifyContent: "flex-start",
                    "font-size": "120%",
                    textAlign: "justify",
                  }}
                >
                  Our expert team of certified trainers is dedicated to
                  supporting you at every step of your fitness journey. They
                  will provide you with the knowledge, guidance, and motivation
                  needed to overcome any obstacles and unlock your true
                  potential. We are here to push your limits and celebrate your achievements.
                </p>
                {/* <p
                align="left"
                style={{
                  color: "#006E7F",
                  display: "flex",
                  justifyContent: "center",
                  "font-size": "120%",
                  textAlign: "justify",
                  fontWeight: "bold",
                }}
              >
                Start with your membership
              </p> */}
                <div
                  style={{
                    marginTop: "10px",
                    // display: "flex"
                  }}
                >
                  <Button
                    style={{
                      backgroundColor: "#B22727",
                      color: "white",
                      padding: "8px",
                      fontSize: "18px",
                      height: "100%",
                      width: "200px",
                      fontFamily: "'Montserrat',sans-serif",
                    }}
                    onClick={() => navigate("/personal-training")}
                  >
                    Get a PT
                  </Button>
                </div>
              </div>
            </div>
            {/* <div
              style={{
                "font-size": "150%",
                marginTop: "5%",
                display: "flex",
                justifyContent: "flex-start",
              }}
            >
              <b style={{ color: "#006E7F" }}> Unleash Your Potential, </b>
              &nbsp;
              <b style={{ color: "#EE5007" }}>Transform Your Body!</b>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
//motto: Empower Your Fitness Journey
