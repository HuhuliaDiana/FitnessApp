import "@progress/kendo-theme-default/dist/all.css";
import moment from "moment";
import { useEffect, useState } from "react";
import MenuBar from "../components/MenuBar";

const UserPT = () => {
  const [userPT, setUserPT] = useState();
  const [endDatePT, setEndDatePT] = useState();
  const accessToken = localStorage.getItem("accessToken");
  const [trainingName, setTrainingName] = useState("");
  const [trainerClub, setTrainerClub] = useState("");

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
          return Promise.reject("Cannot get PT of current user.");
        })
        .then((data) => {
          const endDate = moment(new Date(data.startDate))
            .add(data.personalTraining.noDaysValidity, "days")
            .toISOString()
            .split("T")[0];
          setEndDatePT(endDate);
          setUserPT(data);
          const trainingName = data.personalTraining.personalTrainingType.name;
          let ptName = "";
          if (trainingName.includes("_")) {
            const array = trainingName.split("_");
            array.forEach((a) => {
              ptName += a + " ";
            });
            setTrainingName(ptName);
          } else {
            setTrainingName(trainingName);
          }
          const trainerClub = data.personalTrainer.clubs[0].name;
          setTrainerClub(trainerClub);
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
          {userPT ? (
            <div
              style={{
                boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                marginTop: "100px",
                marginBottom: "auto",
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
                <div
                  style={{
                    width: "70%",
                    margin: "auto",
                    fontSize: "20px",
                    color: "#006E7F",
                  }}
                >
                  <p>
                    <text>Personal Training: </text>
                    {trainingName !== "" && (
                      <text style={{ color: "#EE5007", fontWeight: "bold" }}>
                        {trainingName}
                      </text>
                    )}
                  </p>
                  <p>
                    <text>Sessions to use: </text>
                    <text style={{ color: "#EE5007", fontWeight: "bold" }}>
                      {userPT.personalTraining.sessionsNumber}
                    </text>
                  </p>
                  <p>
                    Available from:{" "}
                    <text style={{ color: "#EE5007", fontWeight: "bold" }}>
                      {userPT.startDate}
                    </text>{" "}
                    to{" "}
                    <text style={{ color: "#EE5007", fontWeight: "bold" }}>
                      {endDatePT}
                    </text>
                  </p>
                  <p>
                    Trainer:{" "}
                    <text style={{ color: "#EE5007", fontWeight: "bold" }}>
                      {userPT.personalTrainer.name}
                    </text>
                  </p>
                  {trainerClub !== "" && (
                    <p>
                      Club:{" "}
                      <text style={{ color: "#EE5007", fontWeight: "bold" }}>
                        {trainerClub}
                      </text>
                    </p>
                  )}
                  <p>
                    Sessions left:{" "}
                    <text style={{ color: "#EE5007", fontWeight: "bold" }}>
                      {userPT.noSessionsLeft}
                    </text>
                  </p>
                </div>
                <div style={{ margin: "auto" }}>
                  <img
                    alt="image"
                    src="pt-booked.svg"
                    style={{ width: "60%", padding: "20px" }}
                  ></img>
                </div>
              </div>
            </div>
          ) : (
            <div style={{ marginTop: "100px" }}>
              <p
                style={{
                  fontSize: "30px",
                  color: "#006E7F",
                  fontWeight: "bold",
                  marginBottom: "150px",
                }}
              >
                Buy sessions of personal training.
              </p>
              <img
                alt="image"
                src="void.svg"
                style={{ width: "18%" }}
              ></img>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default UserPT;
