import "@progress/kendo-theme-default/dist/all.css";
import { Button } from "antd";
import { useEffect, useState } from "react";
import PickDateTimeOfPTSession from "./PickDateTimeOfPTSession";

const BookPTSession = () => {
  const [trainerId, setTrainerId] = useState();
  const [localDate, setLocalDate] = useState();
  const [localTime, setLocalTime] = useState();
  const [noDaysValidity, setNoDaysValidity] = useState();
  const [errMsg, setErrMsg] = useState();
  const [startDateOfPT, setStartDateOfPT] = useState();
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
          setTrainerId(data.personalTrainer.id);
          setStartDateOfPT(data.startDate);
          setNoDaysValidity(data.personalTraining.noDaysValidity);
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };
  const bookPTSession = () => {
    try {
      fetch(`http://localhost:8080/api/pt-session`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        method: "post",
        body: JSON.stringify({localDate, localTime }),
      })
        .then((response) => {
          if (response.status === 406) {
            return response.json();
          } else if (!response.ok && response.status !== 406) {
            return Promise.reject("Cannot book PT.");
          }
        })
        .then((data) => {
          setErrMsg(data.message);
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };
  const onSelectDateTime = (data) => {
    setLocalDate(data.localDate);
    setLocalTime(data.localTime);
  };
  useEffect(() => {
    setErrMsg(null);
  }, [localDate, localTime]);
  useEffect(() => {
    getPTOfCurrentUser();
  }, []);
  return (
    <div>
      {trainerId && (
        <PickDateTimeOfPTSession
          onSelectDateTime={onSelectDateTime}
          parentToChild={{ trainerId, startDateOfPT, noDaysValidity }}
        />
      )}
      <Button onClick={bookPTSession}>Book PT </Button>
      {errMsg && <p>{errMsg}</p>}
    </div>
  );
};
export default BookPTSession;
