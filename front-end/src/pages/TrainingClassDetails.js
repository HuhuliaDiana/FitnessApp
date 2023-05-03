import { Button } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const TrainingClassDetails = () => {
  const id = useParams().id;
  const accessToken = localStorage.getItem("accessToken");
  const [status, setStatus] = useState("");
  const [buttonTitle, setButtonTitle] = useState("");
  const [handleOnClick, setHandleOnClick] = useState(() => {});
  const [isCancelable, setIsCancelable] = useState();
  const [displayBtn, setDisplayBtn] = useState();

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
          console.log(data.message);
          setStatus(data.message);
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
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
          isClassCancelableByUser()
          console.log(data);
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
          isClassCancelableByUser()
          console.log(data);
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
          console.log(data);
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {status && <p>{status}</p>}
      {displayBtn && <Button onClick={handleOnClick}>{buttonTitle}</Button>}
      {isCancelable == false && status == "You booked this class" && (
        <p>You can not cancel this class. Time limit has expired</p>
      )}
    </div>
  );
};
export default TrainingClassDetails;
