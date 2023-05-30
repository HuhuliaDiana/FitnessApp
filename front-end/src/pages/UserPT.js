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
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <div style={{ width: "70%", margin: "auto" }}>
                  <p>
                    PERSONAL TRAINING:{" "}
                    {userPT.personalTraining.personalTrainingType.name}
                  </p>
                  <p>
                    Sessions to use: {userPT.personalTraining.sessionsNumber}
                  </p>
                  <p>
                    Available from {userPT.startDate} to {endDatePT}
                  </p>
                  <p>Trainer: {userPT.personalTrainer.name}</p>
                  <p>Club: WORLD CLASS PARKLAKE</p>
                  <p>Sessions left: {userPT.noSessionsLeft}</p>
                </div>
                <div style={{ margin: "auto" }}>
                  <img
                    alt="image"
                    src="pt-booked.svg"
                    style={{ width: "50%", padding: "20px" }}
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
