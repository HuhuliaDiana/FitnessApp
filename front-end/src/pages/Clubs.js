import { DownOutlined } from "@ant-design/icons";
import { Button, DatePicker, Dropdown, InputNumber, Space } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MenuBar from "../components/MenuBar";
const Clubs = () => {
  const accessToken = localStorage.getItem("accessToken");
  const [cities, setCities] = useState([]);
  const [cityId, setCityId] = useState(null);
  const [clubs, setClubs] = useState([]);
  const [clubSelected, setClubSelected] = useState(null);
  const navigate = useNavigate();

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
  const getClubById = () => {
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
          return Promise.reject("Cannot get club by id.");
        })
        .then((data) => {
          console.log(data);
          setClubSelected(data);
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getAllCities();
  }, []);
  useEffect(() => {
    if (cityId) getClubsByCityId();
  }, [cityId, setCityId]);
  useEffect(() => {});
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
              See our clubs
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
                  style={{ width: "50%", padding: "20px" }}
                ></img>
              </div>
              {cities.length > 0 && (
                <div style={{ width: "70%", margin: "auto" }}>
                  {cities.map((city) => {
                    return (
                      <Button onClick={() => setCityId(city.id)} key={city.id}>
                        {city.name}
                      </Button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
        {clubs.length > 0 && (
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
            <div style={{ display: "flex", justifyContent: "center" }}>
              {clubs.map((club) => {
                return (
                  <Button
                    style={{ marginRight: "10px", width: "300px" }}
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
          <div>
            {clubSelected && (
              <div
                style={{
                  width: "20%",
                  "text-align": "center",
                  "margin-top": "50px",
                  padding: "20px",
                  backgroundColor: "white",
                  color: "#006E7F",
                  "margin-left": "auto",
                  "margin-right": "auto",
                  "box-shadow": "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                }}
              >
                <p>{clubSelected.name}</p>
                <p>{clubSelected.address}</p>
                <Button
                  style={{
                    backgroundColor: "#B22727",
                    color: "white",
                    "margin-top": "20px",
                    "font-size": "100%",
                    height: "100%",
                  }}
                  onClick={onOpenBuyMembershipPage}
                >
                  Continue
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default Clubs;
