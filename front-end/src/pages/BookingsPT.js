import { useEffect, useState } from "react";
import PTSession from "../components/PTSession";
import MenuBar from "../components/MenuBar";

const BookingsPT = () => {
  const accessToken = localStorage.getItem("accessToken");
  const [bookingsPT, setBookingsPT] = useState();

  const getBookingsPT = () => {
    try {
      fetch(`http://localhost:8080/api/pt-session/bookings`, {
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

          return Promise.reject("Cannot get bookings PT of current user.");
        })
        .then((data) => {
          setBookingsPT(data);
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getBookingsPT();
  }, []);
  return (
    <div className="parent">
      <MenuBar></MenuBar>
      <div className="child">
        {bookingsPT &&
          bookingsPT.map((bookingPT) => {
            return <PTSession key={bookingPT.id} parentToChild={bookingPT} />;
          })}
      </div>
    </div>
  );
};
export default BookingsPT;
