import { useEffect, useState } from "react";
import MenuBar from "../components/MenuBar";
import PTSession from "../components/PTSession";
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
              Personal Training booked sessions
            </div>
          </div>
          <div
            style={{
              "box-shadow": "rgba(0, 0, 0, 0.24) 0px 3px 8px",
              "margin-top": "50px",
              display: "flex",
              padding: "20px",
              "flex-direction": "column",
              width: "70%",
              justifyContent: "center",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <div>
              <img
                src="/pt-history.svg"
                alt="image"
                style={{ width: "25%" }}
              ></img>
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
export default BookingsPT;
