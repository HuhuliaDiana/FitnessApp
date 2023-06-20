import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const TrainingClass = (props) => {
  const trainingClass = props.parentToChild;
  const navigate = useNavigate();

  const [className, setClassName] = useState("");

  const duration = Number(trainingClass.trainingClassHour.timerDuration);
  const [endingTimeString, setEndingTimeString] = useState("");
  const accessToken = localStorage.getItem("accessToken");
  const [status, setStatus] = useState("");

  const [beginningTimeString, setBeginningTimeString] = useState("");
  const getHour = () => {
    const beginningTime = new Date(trainingClass.classDate);
    let beginningTimeHour = beginningTime.getHours();

    let beginningTimeMinutes = beginningTime.getMinutes();
    if (beginningTimeHour.toString().length === 1)
      beginningTimeHour = "0" + beginningTimeHour;

    if (beginningTimeMinutes === 0) beginningTimeMinutes += "0";
    const beginningTimeString = beginningTimeHour + ":" + beginningTimeMinutes;

    setBeginningTimeString(beginningTimeString);

    let endingTime = new Date(beginningTime.getTime() + 60000 * duration);
    let endingTimeHour = endingTime.getHours();
    let endingTimeMinutes = endingTime.getMinutes();
    if (endingTimeMinutes === 0) endingTimeMinutes += "0";
    if (endingTimeHour.toString().length === 1)
      endingTimeHour = "0" + endingTimeHour;
    const endingTimeString = endingTimeHour + ":" + endingTimeMinutes;

    setEndingTimeString(endingTimeString);
  };
  useEffect(() => {
    getHour();
    getStatusOfClass();
    const trainingClassName = trainingClass.trainingClassHour.className;
    if (trainingClassName.includes("_")) {
      let className = "";
      const array = trainingClassName.split("_");
      array.forEach((a) => {
        className += a + " ";
      });
      setClassName(className);
    } else {
      setClassName(trainingClassName);
    }
  });
  const getStatusOfClass = () => {
    try {
      fetch(`http://localhost:8080/api/class/status/${trainingClass.id}`, {
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
          if (data.message.includes("You already booked"))
            setStatus(data.message.split(":")[0]);
          else setStatus(data.message);
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };
  const styleStatus = () => {
    if (status.includes("Booking available")) {
      return { color: "#006E7F" };
    } else if (status.includes("You booked this class")) {
      return { color: "#EE5007" };
    }
    return { color: "red" };
  };

  return (
    <div
      style={{
        boxShadow:
          "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
        padding: "5px",
        fontSize: "15px",
        fontWeight: "bold",
        height: "20vh",
        //puse pt pagina booked classes
        marginRight: "20px",
        width: "200px",
        //
      }}
      onClick={() => {
        navigate(`/schedule/${trainingClass.id}`);
      }}
    >
      <div>
        <p style={{ color: "#006E7F" }}>
          {beginningTimeString} - {endingTimeString}
        </p>
        {className && <p style={{ color: "#B22727" }}>{className}</p>}
        <p style={{ color: "#EE5007" }}>
          {trainingClass.trainingClassHour.trainingClassType.name}
        </p>
        <p style={{ color: "#006E7F", fontSize: "14px" }}>
          {trainingClass.trainerName}
        </p>
      </div>
      <div
        style={{
          height: "30%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <p style={styleStatus()}>{status}</p>
      </div>
    </div>
  );
};
export default TrainingClass;
