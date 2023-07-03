import { Button } from "antd";
import { useEffect, useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import MenuBar from "../components/MenuBar";
const Clubs = () => {
  const accessToken = localStorage.getItem("accessToken");
  const [cities, setCities] = useState([]);
  const [cityId, setCityId] = useState(null);
  const [clubs, setClubs] = useState([]);
  const [clubSelected, setClubSelected] = useState(null);
  const navigate = useNavigate();
  const [citySelected, setCitySelected] = useState();
  const [clubsAllowAccess, setClubsAllowAccess] = useState([]);
  const [pressMark, setPressMark] = useState(false);
  const [subscription, setSubscription] = useState();

  const getUserSubscription = () => {
    try {
      fetch(`http://localhost:8080/api/user-subscription`, {
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
          return Promise.reject("Cannot fetch user subscription.");
        })
        .then((data) => {
          setSubscription(data);
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };

  const onOpenBuyMembershipPage = (id) => {
    navigate("/club-subscriptions", {
      state: {
        id: clubSelected.id,
        name: clubSelected.name,
      },
    });
  };
  const getClubsByCityId = () => {
    try {
      fetch(`http://localhost:8080/api/club/city/${cityId}`, {
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
          return Promise.reject("Cannot get clubs by city id.");
        })
        .then((data) => {
          console.log(data);
          setClubs(data);
          setCitySelected(data[0].city.name);
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };
  const getAllCities = () => {
    try {
      fetch(`http://localhost:8080/api/city`, {
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
          return Promise.reject("Cannot get cities.");
        })
        .then((data) => {
          console.log(data);
          setCities(data);
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getUserSubscription();
    getAllCities();
  }, []);
  useEffect(() => {
    if (cityId) getClubsByCityId();
  }, [cityId, setCityId]);

  const styleBtnClub = (id) => {
    if (pressMark === true && clubsAllowAccess.includes(id))
      return {
        color: "white",
        marginRight: "10px",
        backgroundColor: "#006E7F",
        fontFamily: "'Montserrat', sans-serif",
        padding: "8px",
        width: "250px",
        marginBottom: "10px",
        height: "40px",
      };
    else
      return {
        color: "#006E7F",
        marginRight: "10px",
        fontFamily: "'Montserrat', sans-serif",
        width: "250px",
        padding: "8px",
        marginBottom: "10px",
        height: "40px",
      };
  };
  const getClubsAllowAccess = () => {
    try {
      fetch(`http://localhost:8080/api/club/available`, {
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
          return Promise.reject("Cannot fetch clubs.");
        })
        .then((data) => {
          const ids = data.map((d) => d.id);
          setPressMark(true);
          setClubsAllowAccess(ids);
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };

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
              See our clubs
            </div>
            {subscription && (
              <div
                style={{
                  marginTop: "auto",
                  marginBottom: "auto",
                  marginRight: "20px",
                }}
              >
                {pressMark === false ? (
                  <Link
                    style={{
                      "margin-top": "auto",
                      textDecoration: "none",
                      "margin-bottom": "auto",
                      "margin-left": "20px",
                      "margin-right": "20px",
                    }}
                    onClick={getClubsAllowAccess}
                  >
                    Mark subscription-based accessable clubs
                  </Link>
                ) : (
                  <Link
                    style={{
                      "margin-top": "auto",
                      textDecoration: "none",
                      "margin-bottom": "auto",
                      "margin-left": "20px",
                      "margin-right": "20px",
                    }}
                    onClick={() => setPressMark(false)}
                  >
                    Disable mark on subscription-based accessable clubs
                  </Link>
                )}
              </div>
            )}
          </div>
          <div
            style={{
              boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
              marginTop: "30px",
              display: "flex",
              padding: "20px",
              flexDirection: "column",
              width: "70%",
              justifyContent: "center",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div style={{ margin: "auto" }}>
                <img
                  src="/locations.svg"
                  alt="image"
                  style={{ width: "43%", padding: "20px" }}
                ></img>
              </div>
              {cities.length > 0 && (
                <div
                  style={{
                    width: "70%",
                    margin: "auto",
                  }}
                >
                  <p
                    style={{
                      fontSize: "25px",
                      color: "#006E7F",
                      marginBottom: "50px",
                      fontWeight: "bold",
                    }}
                  >
                    Choose your city
                  </p>
                  <div
                    style={{
                      margin: "auto",
                      display: "flex",
                      flexWrap: "wrap",
                      justifyContent: "center",
                    }}
                  >
                    {cities.map((city) => {
                      return (
                        <Button
                          style={{
                            color: "#006E7F",
                            padding: "5px",
                            width: "130px",
                            marginBottom: "20px",
                            height: "100%",
                            marginRight: "20px",
                          }}
                          onClick={() => setCityId(city.id)}
                          key={city.id}
                        >
                          <FaMapMarkerAlt
                            style={{ color: "#B22727", marginRight: "10px" }}
                          />{" "}
                          {city.name}
                        </Button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        {clubs.length > 0 && (
          <div
            style={{
              boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
              marginTop: "20px",
              display: "flex",
              padding: "20px",
              flexDirection: "column",
              width: "70%",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <p
              style={{
                marginBottom: "40px",
                fontSize: "20px",
                color: "#006E7F",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Fit & Repeat clubs in{" "}
              <b style={{ color: "#B22727" }}>{citySelected}</b>
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              {clubs.map((club) => {
                return (
                  <Button
                    style={styleBtnClub(club.id)}
                    onClick={() => setClubSelected(club)}
                    key={club.id}
                  >
                    {club.name}
                  </Button>
                );
              })}
            </div>
          </div>
        )}

        {clubSelected && (
          <div
            style={{
              width: "20%",
              "text-align": "center",
              "margin-top": "20px",
              padding: "20px",
              backgroundColor: "white",
              color: "#006E7F",
              "margin-left": "auto",
              marginBottom:"30px",
              "margin-right": "auto",
              "box-shadow": "rgba(0, 0, 0, 0.24) 0px 3px 8px",
            }}
          >
            <div>
              <img
                alt="image"
                src="current_location.svg"
                style={{ width: "50%" }}
              ></img>
            </div>
            <p style={{ fontWeight: "bold", fontSize: "18px" }}>
              {clubSelected.name}
            </p>
            <p>{clubSelected.address}</p>
            <Button
              style={{
                backgroundColor: "#006E7FCC",
                color: "white",
                "margin-top": "20px",
                "font-size": "100%",
                height: "40px",
              }}
              onClick={onOpenBuyMembershipPage}
            >
              Continue
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
export default Clubs;
