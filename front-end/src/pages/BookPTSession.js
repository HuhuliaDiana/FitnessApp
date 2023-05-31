import "@progress/kendo-theme-default/dist/all.css";
import { Button } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import MenuBar from "../components/MenuBar";
import PickDateTimeOfPTSession from "../components/PickDateTimeOfPTSession";
const allTimes = [
  "07:00 - 08:00",
  "08:00 - 09:00",
  "17:00 - 18:00",
  "18:00 - 19:00",
  "19:00 - 20:00",
  "20:00 - 21:00",
];
const BookPTSession = () => {
  const [trainerId, setTrainerId] = useState();
  const [localDate, setLocalDate] = useState();
  const [localTime, setLocalTime] = useState();
  const [bookingDate, setBookingDate] = useState(null);

  const [noDaysValidity, setNoDaysValidity] = useState();

  const [errMsg, setErrMsg] = useState();
  const [bookingTimes, setBookingTimes] = useState([]);

  const [startDateOfPT, setStartDateOfPT] = useState();
  const [userPT, setUserPT] = useState();
  const [endDatePT, setEndDatePT] = useState();
  const accessToken = localStorage.getItem("accessToken");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [sessionHoursReserved, setSessionHoursReserved] = useState([]);
  const [localBookingDate, setLocalBookingDate] = useState();

  useEffect(() => {
    getPTSessionByTrainerId();
  }, [userPT, bookingDate]);
  const getPTSessionByTrainerId = () => {
    try {
      fetch(
        `http://localhost:8080/api/pt-session/${userPT.personalTrainer.id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          method: "get",
        }
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject("Cannot get PT sessions by trainer id.");
        })
        .then((data) => {
          let dataFilteredByChosenDate = [];
          if (localBookingDate) {
            dataFilteredByChosenDate = data.filter(
              (d) => d.sessionDate === localBookingDate
            );
          }
          const array = dataFilteredByChosenDate.map(
            (d) => d.startSessionTime + " - " + d.endSessionTime
          );
          setSessionHoursReserved(array);
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (sessionHoursReserved.length !== 0) {
      const extract = allTimes.filter((t) => !sessionHoursReserved.includes(t));
      setBookingTimes(extract.sort());
    }
  }, [sessionHoursReserved]);

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
          setTrainerId(data.personalTrainer.id);
          setStartDateOfPT(data.startDate);
          setNoDaysValidity(data.personalTraining.noDaysValidity);
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    console.log("selectedtimeslot " + selectedTimeSlot);
    if (selectedTimeSlot) {
      setLocalDate(localBookingDate);
      setLocalTime(selectedTimeSlot.split(" - ")[0]);
    }
  }, [selectedTimeSlot]);
  const bookPTSession = () => {
    try {
      console.log("in book session: " + localBookingDate + " - " + localTime);
      fetch(`http://localhost:8080/api/pt-session`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        method: "post",
        body: JSON.stringify({ localDate: localBookingDate, localTime }),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setErrMsg(data.message);
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };

  const onBookingTimes = (data) => {
    console.log(data);
    setBookingTimes(data.bookingTimes);
    setBookingDate(data.bookingDate);
    setSelectedTimeSlot(data.selectedTimeSlot);
    setLocalBookingDate(data.localBookingDate);
  };
  useEffect(() => {
    setErrMsg(null);
  }, [localDate, localTime]);
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
              Book a date for a PT session
            </div>
          </div>
          {/* {userPT && (
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
          )} */}
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
                marginBottom:"150px"
              }}
            >
              <div>
                Start your personal training with{" "}
                <b>{userPT.personalTrainer.name}</b>
                <br></br> at WORLD CLASS PARKLAKE
              </div>
              <div
                className="k-mb-4 k-font-weight-bold"
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  border: "2px solid green",
                  marginTop: "30px",
                  padding: "10px",
                }}
              >
                Pick a date
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "20px",
                }}
              >
                <div
                  style={{
                    width: "50%",
                    display: "flex",
                  }}
                >
                  <img
                    alt="image"
                    src="/calendar.svg"
                    style={{
                      width: "70%",
                      margin: "auto",
                    }}
                  ></img>
                </div>
                <div
                  style={{
                    marginLeft: "10%",
                    width: "50%",
                  }}
                >
                  <PickDateTimeOfPTSession
                    onBookingTimes={onBookingTimes}
                    parentToChild={{ trainerId, startDateOfPT, noDaysValidity }}
                  />
                </div>
              </div>
              <div>
                {bookingTimes.length > 0 && (
                  <div>
                    <div
                      className="k-mb-4 k-font-weight-bold"
                      style={{
                        border: "2px solid green",
                        display: "flex",
                        justifyContent: "flex-start",
                        padding:"10px"
                      }}
                    >
                      Select a time slot
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "60%",
                      }}
                    >
                      {bookingTimes.map((time) => {
                        return (
                          <Button
                            style={{ backgroundColor: "", color: "" }}
                            key={time}
                            className="k-button k-mb-4"
                            onClick={(e) => {
                              setSelectedTimeSlot(time);
                            }}
                          >
                            {time}
                          </Button>
                        );
                      })}
                    </div>
                  </div>
                )}
                {bookingDate && selectedTimeSlot ? (
                  <div>
                    Date and time slot selected:
                    <p>
                      {bookingDate.toDateString()} at {selectedTimeSlot}
                    </p>
                  </div>
                ) : null}
              </div>
              {localTime && (
                <div>
                  <Button onClick={bookPTSession}>Book PT </Button>
                  {errMsg && <p style={{color:"red"}}>{errMsg}</p>}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default BookPTSession;
