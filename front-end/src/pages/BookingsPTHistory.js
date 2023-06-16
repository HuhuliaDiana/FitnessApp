import { useEffect, useState } from "react";
import MenuBar from "../components/MenuBar";
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
          console.log(data)
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
            boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
            padding: "3px",
          }}
        >
          <p
            style={{
              fontSize: "120%",
              fontWeight: "bold",
              marginLeft: "15px",
              color:"#006E7F"

            }}
          >
            Welcome to Fit & Repeat
          </p>
        </div>

        <div className="child">
          <div
            style={{
              boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
              display: "flex",
              height: "50px",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                marginTop: "auto",
                marginBottom: "auto",
                marginLeft: "20px",
              }}
            >
              Personal Training history sessions
            </div>
          </div>
          <div
            style={{
              boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
              marginTop: "50px",
              display: "flex",
              padding: "20px",
              flexDirection: "column",
              width: "70%",
              justifyContent: "center",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <div>
              <img src="/booked.svg" alt="image" style={{ width: "25%" }}></img>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
                marginTop: "50px",
              }}
            >
              {bookingsPT &&
                bookingsPT.map((bookingPT) => {
                  return (
                    <PTSession key={bookingPT.id} parentToChild={bookingPT} />
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BookingsPTHistory;
