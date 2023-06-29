import { useEffect, useState } from "react";
import MenuBar from "../components/MenuBar";
import TrainingClassesByClubAndDate from "../components/TrainingClassesByClubAndDate";

const BookingClasses = () => {
  const accessToken = localStorage.getItem("accessToken");
  const [clubs, setClubs] = useState([]);
  const [data, setData] = useState([]);

  const removeJSONDuplicatesClubs = (clubs) => {
    var uniqueArray = [];
    for (var i = 0; i < clubs.length; i++) {
      if (!uniqueArray.find((x) => x.id === clubs[i].id)) {
        uniqueArray.push(clubs[i]);
      }
    }
    return uniqueArray;
  };
  const getBookingClasses = () => {
    try {
      fetch(`http://localhost:8080/api/class/booked/future`, {
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
          console.log(response);
        })
        .then((data) => {
          console.log(data);
          setData(data);
          let clubs = data.map((d) => d.club);
          setClubs(removeJSONDuplicatesClubs(clubs));
          console.log(clubs);
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getBookingClasses();
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
              color: "#006E7F",
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
              Your future attendings to classes
            </div>
          </div>
          {data.length !== 0 ? (
            <div
              style={{
                boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                marginTop: "50px",
                display: "flex",
                padding: "20px",
                flexDirection: "column",
                width: "60%",
                marginBottom: "50px",
                justifyContent: "center",
                marginLeft: "19%",
              }}
            >
              <div>
                <img
                  alt="image"
                  src="/bookings-future-attendings.svg"
                  style={{ width: "20%" }}
                ></img>
              </div>
              <div>
                {clubs !== [] &&
                  clubs.map((club) => {
                    return (
                      <div
                        key={club.id}
                        style={{
                          width: "100%",
                          marginRight: "20px",
                        }}
                      >
                        <TrainingClassesByClubAndDate
                          key={club.id}
                          parentToChild={{ club, data }}
                        />
                      </div>
                    );
                  })}
              </div>
            </div>
          ) : (
            <div style={{ marginTop: "100px" }}>
              <p
                style={{
                  fontSize: "30px",
                  color: "#006E7F",
                  fontWeight: "bold",
                  marginBottom: "150px",
                }}
              >
                You haven't booked any class yet.
              </p>
              <img alt="image" src="void.svg" style={{ width: "18%" }}></img>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default BookingClasses;
