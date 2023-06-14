import { Button } from "antd";
import { useEffect, useState } from "react";
import {
  FaCalendarDay,
  FaClock,
  FaLocationArrow,
  FaUserAlt,
} from "react-icons/fa";
import { useParams } from "react-router-dom";
import MenuBar from "../components/MenuBar";
import ClassDetails from "../utils/ClassDetails";
const TrainingClassDetails = () => {
  const id = useParams().id;
  const accessToken = localStorage.getItem("accessToken");
  const [status, setStatus] = useState("");
  const [buttonTitle, setButtonTitle] = useState("");
  const [handleOnClick, setHandleOnClick] = useState(() => {});
  const [isCancelable, setIsCancelable] = useState();
  const [displayBtn, setDisplayBtn] = useState();
  const [trainingClass, setTrainingClass] = useState();
  const [classDate, setClassDate] = useState("");
  const [beginHour, setBeginHour] = useState();
  const [endHour, setEndHour] = useState();
  const [className, setClassName] = useState("");
  const [trainingType, setTrainingType] = useState([]);
  const [equipment, setEquipment] = useState([]);
  // const classDetails = ClassDetails;

  const getStatusOfClass = () => {
    try {
      fetch(`http://localhost:8080/api/class/status/${id}`, {
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
          return Promise.reject("Cannot get status of class by id.");
        })
        .then((data) => {
          setStatus(data.message);
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getClassById();
    getStatusOfClass();
    isClassCancelableByUser();
  }, []);
  const bookClass = () => {
    try {
      fetch(`http://localhost:8080/api/class/book/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        method: "PATCH",
      })
        .then((response) => {
          if (response.ok) {
            return "Successfully booked!";
          }
          return Promise.reject("Cannot book class by id.");
        })
        .then((data) => {
          getStatusOfClass();
          isClassCancelableByUser();
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };
  const getClassById = () => {
    try {
      fetch(`http://localhost:8080/api/class/${id}`, {
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
          return Promise.reject("Cannot book class by id.");
        })
        .then((data) => {
          console.log(data);
          setTrainingClass(data);
          const time = data.classDate.split("T");
          setClassDate(time[0]);
          const className = data.trainingClassHour.className;
          let trainingClassName = "";
          if (className.includes("_")) {
            const array = className.split("_");
            array.forEach((a) => {
              trainingClassName += a + " ";
            });
            setClassName(trainingClassName);
          } else {
            setClassName(className);
          }
          const duration = Number(data.trainingClassHour.timerDuration);
          const beginningTime = new Date(data.classDate);
          let beginningTimeHour = beginningTime.getUTCHours();
          let beginningTimeMinutes = beginningTime.getUTCMinutes();

          if (beginningTimeMinutes === 0) beginningTimeMinutes += "0";
          if (beginningTimeHour.toString().length === 1)
            beginningTimeHour = "0" + beginningTimeHour;
          const beginningTimeString =
            beginningTimeHour + ":" + beginningTimeMinutes;

          setBeginHour(beginningTimeString);

          const endingTime = new Date(
            beginningTime.getTime() + 60000 * duration
          );
          let endingTimeHour = endingTime.getUTCHours();
          let endingTimeMinutes = endingTime.getUTCMinutes();

          if (endingTimeMinutes === 0) endingTimeMinutes += "0";
          if (endingTimeHour.toString().length === 1)
            endingTimeHour = "0" + endingTimeHour;
          const endingTimeString = endingTimeHour + ":" + endingTimeMinutes;
          setEndHour(endingTimeString);

          const classType = data.trainingClassHour.trainingClassType.name;
          switch (classType) {
            case "CYCLING":
              {
                setTrainingType(ClassDetails.CYCLING_TRAINING_TYPE);
                setEquipment(ClassDetails.CYCLING_EQUIPMENT);
              }

              break;
            case "AEROBIC":
              {
                setTrainingType(ClassDetails.AEROBIC_TRAINING_TYPE);
                setEquipment(ClassDetails.AEROBIC_EQUIPMENT);
              }
              break;

            default:
              {
                setTrainingType(ClassDetails.AQUA_TRAINING_TYPE);
                setEquipment(ClassDetails.AQUA_EQUIPMENT);
              }
              break;
          }
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };
  const cancelBooking = () => {
    try {
      fetch(`http://localhost:8080/api/class/booked/cancel/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        method: "PATCH",
      })
        .then((response) => {
          if (response.ok) {
            return "Successfully canceled!";
          }
          return Promise.reject("Cannot cancel class by id.");
        })
        .then((data) => {
          getStatusOfClass();
          isClassCancelableByUser();
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (status === "Booking available") {
      setButtonTitle("Book class");
      setDisplayBtn(true);
      setHandleOnClick(() => bookClass);
    }
    if (status === "You booked this class" && isCancelable == true) {
      setButtonTitle("Cancel Booking");
      setDisplayBtn(true);
      setHandleOnClick(() => cancelBooking);
    }
    if (status === "You booked this class" && isCancelable == false) {
      setDisplayBtn(false);
    }
  }, [status, setStatus]);

  const isClassCancelableByUser = () => {
    try {
      fetch(`http://localhost:8080/api/class/booked/cancelable/${id}`, {
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
        })
        .then((data) => {
          setIsCancelable(data);
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
            }}
          >
            Welcome to Fit & Repeat
          </p>
        </div>

        <div className="child">
          <div
            style={{
              "box-shadow": "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
              display: "flex",
              height: "50px",
              "flex-direction": "row",
              "justify-content": "space-between",
            }}
          >
            <div
              style={{
                "margin-top": "auto",
                "margin-bottom": "auto",
                "margin-left": "20px",
              }}
            >
              About training class
            </div>
          </div>
          {trainingClass && (
            <div
              style={{
                boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                marginTop: "50px",
                marginBottom: "auto",
                display: "flex",
                padding: "20px",
                flexDirection: "column",
                width: "50%",
                justifyContent: "center",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "50px",
                }}
              >
                <div style={{ width: "50%", marginLeft: "auto" }}>
                  {className && (
                    <p
                      style={{
                        fontWeight: "bold",
                        color: "#006E7F",
                        fontSize: "25px",
                        marginBottom: "50px",
                      }}
                    >
                      {className}
                    </p>
                  )}
                  <div
                    style={{
                      margin: "auto",
                      marginLeft: "50px",
                      marginBottom: "40px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        margin: "auto",
                        color: "#006E7F",
                        marginBottom: "10px",
                        fontSize: "20px",
                      }}
                    >
                      <FaUserAlt
                        style={{
                          color: "#EE5007",
                          fontSize: "20px",
                          marginRight: "20px",
                        }}
                      />
                      {trainingClass.trainerName}
                    </div>
                    {classDate && (
                      <div
                        style={{
                          display: "flex",
                          margin: "auto",
                          color: "#006E7F",
                          marginBottom: "10px",
                          fontSize: "20px",
                        }}
                      >
                        <FaCalendarDay
                          style={{
                            color: "#EE5007",
                            fontSize: "20px",
                            marginRight: "20px",
                          }}
                        />
                        {classDate}
                      </div>
                    )}
                    {beginHour && endHour && (
                      <div
                        style={{
                          display: "flex",
                          margin: "auto",
                          color: "#006E7F",
                          fontSize: "20px",
                          marginBottom: "10px",
                        }}
                      >
                        <FaClock
                          style={{
                            color: "#EE5007",
                            fontSize: "20px",
                            marginRight: "20px",
                          }}
                        />
                        {beginHour} - {endHour}
                      </div>
                    )}

                    <div
                      style={{
                        display: "flex",
                        margin: "auto",
                        color: "#006E7F",
                        fontSize: "20px",
                      }}
                    >
                      <FaLocationArrow
                        style={{
                          color: "#EE5007",
                          fontSize: "20px",
                          marginRight: "20px",
                        }}
                      />
                      {trainingClass.club.name}
                    </div>
                  </div>
                </div>
                <div style={{ margin: "auto" }}>
                  <img
                    alt="image"
                    src="/working_out.svg"
                    style={{ width: "50%", padding: "20px" }}
                  ></img>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <div
                  style={{
                    width: "36%",
                    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                    padding: "20px",
                  }}
                >
                  <p
                    style={{
                      color: "#006E7F",
                      fontSize: "20px",
                      display: "flex",
                      justifyContent: "flex-start",
                    }}
                  >
                    Type of training
                  </p>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                    }}
                  >
                    {trainingType &&
                      trainingType.map((type) => {
                        return (
                          <p
                            style={{
                              border: "",
                              padding: "5px 22px 5px 22px",
                              marginRight: "30px",
                              backgroundColor: "#F8CB2E",
                              fontSize: "17px",
                              color: "#B22727",
                              boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                            }}
                          >
                            {type}
                          </p>
                        );
                      })}
                  </div>
                </div>
                <div
                  style={{
                    width: "36%",
                    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                    padding: "20px",
                  }}
                >
                  <p
                    style={{
                      color: "#006E7F",
                      fontSize: "20px",
                      display: "flex",
                      justifyContent: "flex-start",
                    }}
                  >
                    Equipment used
                  </p>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                    }}
                  >
                    {equipment &&
                      equipment.map((type) => {
                        return (
                          <p
                            style={{
                              backgroundColor: "#EE5007",
                              fontSize: "17px",
                              padding: "5px 22px 5px 22px",
                              color: "white",
                              marginRight: "30px",
                              boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                            }}
                          >
                            {type}
                          </p>
                        );
                      })}
                  </div>
                </div>
              </div>

              {status && (
                <p
                  style={{
                    marginTop: "50px",
                    color: "#006E7F",
                    fontSize: "22px",
                  }}
                >
                  {status}
                </p>
              )}
              {displayBtn && (
                <div style={{ marginTop: "10px", marginBottom: "20px" }}>
                  <Button
                    onClick={handleOnClick}
                    style={{
                      color: "white",
                      backgroundColor: "#006E7F",
                      fontFamily: "'Montserrat',sans-serif",
                      fontSize: "17px",
                      height: "45px",
                      padding: "8px",
                      width: "170px",
                    }}
                  >
                    {buttonTitle}
                  </Button>
                </div>
              )}
              {isCancelable == false && status == "You booked this class" && (
                <p style={{ color: "red" }}>
                  You can not cancel this class. Time limit has expired.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default TrainingClassDetails;
