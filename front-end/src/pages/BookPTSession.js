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
          // console.log(data);
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
    // console.log("selectedtimeslot " + selectedTimeSlot);
    if (selectedTimeSlot) {
      setLocalDate(localBookingDate);
      setLocalTime(selectedTimeSlot.split(" - ")[0]);
    }
  }, [selectedTimeSlot]);
  const bookPTSession = () => {
    try {
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
    console.log(data.localBookingDate);
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
              Book a personal training session
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
                width: "45%",
                justifyContent: "center",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <div
                style={{
                  color: "#006E7F",
                  fontSize: "20px",
                  fontWeight: "bold",
                }}
              >
                Start your personal training with{" "}
                <b style={{ color: "#EE5007" }}>
                  {userPT.personalTrainer.name}
                </b>
                <br></br> at WORLD CLASS PARKLAKE
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
                    width: "90%",
                    display: "flex",
                    border: "",
                  }}
                >
                  <img
                    alt="image"
                    src="/calendar.svg"
                    style={{
                      width: "65%",
                      margin: "auto",
                      padding: "50px",
                    }}
                  ></img>
                </div>
                <div
                  style={{
                    // marginLeft: "10%",
                    display: "flex",
                    flexDirection: "column",
                    margin: "auto",
                    border: "",
                    width: "100%",
                  }}
                >
                  <p
                    style={{
                      textAlign: "center",
                      fontSize: "20px",
                      color: "#006E7F",
                      fontWeight: "bold",
                      marginBottom: "30px",
                    }}
                  >
                    Pick a start date
                  </p>
                  <div
                    style={{
                      justifyContent: "center",
                    }}
                  >
                    <PickDateTimeOfPTSession
                      onBookingTimes={onBookingTimes}
                      parentToChild={{
                        trainerId,
                        startDateOfPT,
                        noDaysValidity,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        {bookingTimes.length > 0 && (
          <div
            style={{
              boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
              marginTop: "40px",
              display: "flex",
              padding: "20px",
              flexDirection: "column",
              width: "45%",
              justifyContent: "center",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <div
              style={{
                border: "",
                display: "flex",
                // justifyContent:"center",
                padding: "10px",
                marginBottom: "30px",
                fontWeight: "bold",
                fontSize: "20px",
                color: "#006E7F",
              }}
            >
              Select a time slot
            </div>
            <div
              style={{
                display: "flex",
              }}
            >
              {bookingTimes.map((time) => {
                return (
                  <Button
                    style={{
                      border: "1px solid #006E7F",
                      // width: "140px",
                      marginRight: "20px",
                    }}
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

        {bookingDate && selectedTimeSlot && (
          <div
            style={{
              boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
              marginTop: "40px",
              display: "flex",
              padding: "20px",
              flexDirection: "column",
              width: "20%",
              justifyContent: "center",
              marginLeft: "auto",
              marginRight: "auto",
              textAlign: "center",
              color: "#006E7F",
            }}
          >
            <p>Date and time slot selected:</p>
            <b>{bookingDate.toDateString()} at {selectedTimeSlot}</b>
            {localTime && (
              <div>
                <Button
                  style={{
                    backgroundColor: "#EE5007",
                    color: "white",
                    fontFamily: "'Montserrat',sans-serif",
                    marginTop: "30px",
                  }}
                  onClick={bookPTSession}
                >
                  Book PT{" "}
                </Button>
              </div>
            )}
          </div>
        )}
        <div style={{ textAlign: "center" }}>
          {errMsg && <p style={{ color: "#B22727" }}>{errMsg}</p>}
        </div>
      </div>
    </div>
  );
};
export default BookPTSession;
