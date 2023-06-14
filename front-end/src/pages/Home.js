import React from "react";
import MenuBar from "../components/MenuBar";

import { Carousel } from "react-carousel-minimal";

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
  color:""
};

const Home = () => {
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
            }}
          >
            Welcome to Fit & Repeat
          </p>
        </div>
        <div className="child">
          <div
            style={{
              // boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
              marginTop: "50px",
              display: "flex",
              padding: "20px",
              flexDirection: "column",
              width: "60%",
              justifyContent: "center",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <div>
              <Carousel
                data={data}
                time={2000}
                width="650px"
                height="400px"
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
                  textAlign: "center",
                  maxWidth: "850px",
                  maxHeight: "500px",
                  margin: "40px auto",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
//motto: Empower Your Fitness Journey
