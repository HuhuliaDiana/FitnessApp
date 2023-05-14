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
    let beginningTimeMinutes = "";
    if (beginningTime.getUTCMinutes() === "0")
      beginningTimeMinutes = beginningTime.getUTCMinutes();
    else beginningTimeMinutes = beginningTime.getUTCMinutes() + "0";

    setBeginningTimeString(beginningTimeHour + ":" + beginningTimeMinutes);

    const endingTime = new Date(beginningTime.getTime() + 60000 * duration);
    const endingTimeHour = endingTime.getUTCHours();
    let endingTimeMinutes = "";
    if (endingTime.getUTCMinutes() === "0")
      endingTimeMinutes = endingTime.getUTCMinutes();
    else endingTimeMinutes = endingTime.getUTCMinutes() + "0";
    setEndingTimeString(endingTimeHour + ":" + endingTimeMinutes);
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
      onClick={() => {
        navigate(`/schedule/${trainingClass.id}`);
      }}
    >
      <p>{trainingClass.trainerName}</p>
      <p>{trainingClass.trainingClassHour.className}</p>
      <b>{trainingClass.trainingClassHour.trainingClassType.name}</b>
      <p>
        {beginningTimeString}-{endingTimeString}
      </p>
      <p>{status}</p>
    </div>
  );
};
export default TrainingClass;
