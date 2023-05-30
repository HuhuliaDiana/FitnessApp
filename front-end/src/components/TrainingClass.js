import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const TrainingClass = (props) => {
  const trainingClass = props.parentToChild;
  const navigate = useNavigate();

  const duration = Number(trainingClass.trainingClassHour.timerDuration);
  const [endingTimeString, setEndingTimeString] = useState("");
  const accessToken = localStorage.getItem("accessToken");
  const [status, setStatus] = useState();

  const [beginningTimeString, setBeginningTimeString] = useState("");
  const getHour = () => {
    const beginningTime = new Date(trainingClass.classDate);
    const beginningTimeHour = beginningTime.getUTCHours();

    const beginningTimeMinutes = beginningTime.getUTCMinutes();

    const beginningTimeString = beginningTimeHour + ":" + beginningTimeMinutes;
    if (beginningTimeMinutes === 0)
      setBeginningTimeString(beginningTimeString + "0");
    else setBeginningTimeString(beginningTimeString);

    const endingTime = new Date(beginningTime.getTime() + 60000 * duration);
    const endingTimeHour = endingTime.getUTCHours();
    const endingTimeMinutes = endingTime.getUTCMinutes();
    const endingTimeString = endingTimeHour + ":" + endingTimeMinutes;
    if (endingTimeMinutes === 0) setEndingTimeString(endingTimeString + "0");
    else setEndingTimeString(endingTimeString);
  };
  useEffect(() => {
    getHour();
    getStatusOfClass();
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
          setStatus(data.message);
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      style={{
        boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
        padding: "5px",
        fontSize: "15px",
      }}
      onClick={() => {
        navigate(`/schedule/${trainingClass.id}`);
      }}
    >
      <p>
        <b>
          {beginningTimeString} - {endingTimeString}
        </b>
      </p>
      <p style={{ color: "#EE5007" }}>
        {trainingClass.trainingClassHour.className}
      </p>
      <p>{trainingClass.trainerName}</p>

      <b style={{ color: "#006E7F" }}>
        {trainingClass.trainingClassHour.trainingClassType.name}
      </b>

      <p>{status}</p>
    </div>
  );
};
export default TrainingClass;
