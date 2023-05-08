import { useEffect, useState } from "react";
import PickDateTimeOfPTSession from "./PickDateTimeOfPTSession";
import "@progress/kendo-theme-default/dist/all.css";
import { Button } from "antd";

const BookPTSession = () => {
  const [trainerId, setTrainerId] = useState();
  const [localDate, setLocalDate] = useState();
  const [localTime, setLocalTime] = useState();
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
        body: JSON.stringify({ trainerId, localDate, localTime }),
      })
        .then((response) => {
          console.log(localDate);
          console.log(localTime);
          if (response.ok) {
            return response.json();
          }
          return Promise.reject("Cannot book PT.");
        })
        .then((data) => {
          console.log(data);
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
    getPTOfCurrentUser();
  }, []);
  return (
    <div>
      {trainerId && (
        <PickDateTimeOfPTSession
          onSelectDateTime={onSelectDateTime}
          parentToChild={{ trainerId }}
        />
      )}
      <Button onClick={bookPTSession}>Book PT </Button>
    </div>
  );
};
export default BookPTSession;
