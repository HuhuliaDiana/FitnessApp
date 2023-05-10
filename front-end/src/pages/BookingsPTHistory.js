import { useEffect, useState } from "react";
import PTSession from "../components/PTSession";

const BookingsPTHistory = () => {
  const accessToken = localStorage.getItem("accessToken");
  const [bookingsPT, setBookingsPT] = useState();

  const getBookingsPTHistory = () => {
    try {
      fetch(`http://localhost:8080/api/pt-session/bookings-history`, {
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

          return Promise.reject(
            "Cannot get bookings PT history of current user."
          );
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
    getBookingsPTHistory();
  }, []);
  return (
    <div>
      {bookingsPT &&
        bookingsPT.map((bookingPT) => {
          return <PTSession key={bookingPT.id} parentToChild={bookingPT} />;
        })}
    </div>
  );
};
export default BookingsPTHistory;
