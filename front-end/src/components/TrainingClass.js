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
    let beginningTimeHour = beginningTime.getUTCHours();

    let beginningTimeMinutes = beginningTime.getUTCMinutes();
    if (beginningTimeHour.toString().length === 1)
      beginningTimeHour = "0" + beginningTimeHour;

    if (beginningTimeMinutes === 0) beginningTimeMinutes += "0";
    const beginningTimeString = beginningTimeHour + ":" + beginningTimeMinutes;

    setBeginningTimeString(beginningTimeString);

    let endingTime = new Date(beginningTime.getTime() + 60000 * duration);
    let endingTimeHour = endingTime.getUTCHours();
    let endingTimeMinutes = endingTime.getUTCMinutes();
    if (endingTimeMinutes === 0) endingTimeMinutes += "0";
    if (endingTimeHour.toString().length === 1)
      endingTimeHour = "0" + endingTimeHour;
    const endingTimeString = endingTimeHour + ":" + endingTimeMinutes;

    setEndingTimeString(endingTimeString);
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
          if (data.message.includes("You already booked"))
            setStatus(data.message.split(":")[0]);
          else setStatus(data.message);
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
