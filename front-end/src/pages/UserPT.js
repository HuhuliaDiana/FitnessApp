import MenuBar from "../components/MenuBar";
import "@progress/kendo-theme-default/dist/all.css";
import { Button } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";

const UserPT = () => {
  const [userPT, setUserPT] = useState();
  const [endDatePT, setEndDatePT] = useState();
  const accessToken = localStorage.getItem("accessToken");

  const getPTOfCurrentUser = () => {
    try {
      fetch(`http://localhost:8080/api/user-training`, {
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
          if (response.status === 404) {
            return Promise.reject("PT user was not found.");
          }
          return Promise.reject("Cannot get PT of current user.");
        })
        .then((data) => {
          console.log(data);
          const endDate = moment(new Date(data.startDate))
            .add(data.personalTraining.noDaysValidity, "days")
            .toISOString()
            .split("T")[0];
          setEndDatePT(endDate);
          setUserPT(data);
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getPTOfCurrentUser();
  }, []);
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
            boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
            padding: "3px",
          }}
        >
          <p
            style={{
              fontSize: "120%",
              fontWeight: "bold",
              marginLeft: "15px",
              color:"#006E7F"

            }}
          >
            Welcome to Fit & Repeat
          </p>
        </div>

        <div className="child">
          <div
            style={{
              boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
              display: "flex",
              height: "50px",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                marginTop: "auto",
                marginBottom: "auto",
                marginLeft: "20px",
              }}
            >
              About your PT
            </div>
          </div>
          {userPT && (
            <div
              style={{
                boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                marginTop: "100px",
                marginBottom:"auto",
                display: "flex",
                padding: "20px",
                flexDirection: "column",
                width: "65%",
                justifyContent: "center",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  fontSize: "20px",
                  color: "#006E7F",
                }}
              >
                <div
                  style={{
                    width: "70%",
                    height: "200px",
                    margin: "auto",
                    display: "flex",
                    justifyContent: "space-around",
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      width: "80%",
                      margin: "auto",
                      justifyContent: "space-between",
                    }}
                  >
                    <text>Personal Training: </text>
                    <text style={{ color: "#EE5007", fontWeight: "bold" }}>
                      {userPT.personalTraining.personalTrainingType.name}
                    </text>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      width: "80%",
                      margin: "auto",
                      justifyContent: "space-between",
                    }}
                  >
                    <text>Sessions to use: </text>
                    <text style={{ color: "#EE5007", fontWeight: "bold" }}>
                      {userPT.personalTraining.sessionsNumber}
                    </text>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      width: "80%",
                      margin: "auto",
                      justifyContent: "space-between",
                    }}
                  >
                    Valadity:{" "}
                    <div>
                      <text style={{ color: "#EE5007", fontWeight: "bold" }}>
                        {userPT.startDate}
                      </text>{" "}
                      to{" "}
                      <text style={{ color: "#EE5007", fontWeight: "bold" }}>
                        {endDatePT}
                      </text>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      width: "80%",
                      margin: "auto",
                      justifyContent: "space-between",
                    }}
                  >
                    Trainer:{" "}
                    <text style={{ color: "#EE5007", fontWeight: "bold" }}>
                      {userPT.personalTrainer.name}
                    </text>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      width: "80%",
                      margin: "auto",
                      justifyContent: "space-between",
                    }}
                  >
                    Club:{" "}
                    <text style={{ color: "#EE5007", fontWeight: "bold" }}>
                      WORLD CLASS PARKLAKE
                    </text>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      width: "80%",
                      margin: "auto",
                      justifyContent: "space-between",
                    }}
                  >
                    Sessions left:{" "}
                    <text style={{ color: "#EE5007", fontWeight: "bold" }}>
                      {userPT.noSessionsLeft}
                    </text>
                  </div>
                </div>
                <div style={{ margin: "auto" }}>
                  <img
                    alt="image"
                    src="pt-booked.svg"
                    style={{ width: "70%", padding: "20px" }}
                  ></img>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default UserPT;
