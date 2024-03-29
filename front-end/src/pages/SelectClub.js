import { DownOutlined } from "@ant-design/icons";
import { Button, Dropdown, Space } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MenuBar from "../components/MenuBar";

function SelectClub() {
  const accessToken = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  const [clubName, setClubName] = useState("Select a club");

  const [clubsDropdown, setClubsDropdown] = useState([]);
  const [clubSelected, setClubSelected] = useState(null);

  const getDropdownClubs = () => {
    try {
      fetch("http://localhost:8080/api/city", {
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
          const newClubs = [];
          data.forEach((city) => {
            const children = [];
            city.clubs.forEach((club) => {
              const newClub = {
                id: club.id,
                key: city.id + "-" + club.id,
                label: club.name,
              };
              children.push(newClub);
            });
            const newCity = {
              key: city.id.toString(),
              label: city.name,
              children: children,
            };
            newClubs.push(newCity);
          });
          setClubsDropdown(newClubs);
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err.message);
    }
  };

  const getClub = (clubId) => {
    fetch(`http://localhost:8080/api/club/${clubId}`, {
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
        return Promise.reject("Cannot get clubs.");
      })
      .then((data) => {
        setClubSelected(data);
        setClubName(data.name);
      });
  };

  useEffect(() => {
    getDropdownClubs();
  }, []);

  const onClick = ({ key }) => {
    const ids = key.split("-");
    const clubId = ids[1];
    getClub(clubId);
  };

  const onOpenBuyMembershipPage = (id) => {
    navigate("/club-subscriptions", {
      state: {
        id: clubSelected.id,
        name: clubSelected.name,
      },
    });
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
            "box-shadow": "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
            padding: "3px",
          }}
        >
          <p
            style={{
              "font-size": "120%",
              "font-weight": "bold",
              "margin-left": "15px",
              color: "#006E7F",
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
              Select a club
            </div>
          </div>
          <div
            style={{
              "box-shadow": "rgba(0, 0, 0, 0.24) 0px 3px 8px",
              display: "flex",
              "justify-content": "center",
              "margin-left": "10%",
              height: "40vh",
              width: "80%",
              marginTop: "3%",
            }}
          >
            <div style={{ width: "30%", margin: "auto" }}>
              <img
                src="/select_club.svg"
                alt="image"
                style={{ width: "90%" }}
              />
            </div>
            <div
              style={{
                width: "60%",
                display: "flex",
                "flex-direction": "column",
                "box-shadow":
                  "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
              }}
            >
              <div
                style={{
                  backgroundColor: "#006E7F",
                  height: "50%",
                }}
              >
                <p
                  style={{
                    marginTop: "70px",
                    color: "white",
                    fontSize: "23px",
                  }}
                >
                  Here is your first step to a healthy life!
                </p>
                <p
                  style={{
                    width: "80%",
                    margin: "auto",
                    marginTop: "30px",
                    color: "white",
                    fontSize: "17px",
                  }}
                >
                  Empower your journey, unleash your potential and transform
                  your life!
                </p>
              </div>
              <div>
                <Dropdown
                  menu={{ items: clubsDropdown, onClick }}
                  style={{ width: "10px" }}
                >
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                  >
                    <Space
                      style={{
                        "box-shadow": " rgba(0, 0, 0, 0.24) 0px 3px 8px",
                        padding: "8px",
                        backgroundColor: "white",
                        width: "48%",
                        marginTop: "80px",
                        justifyContent: "space-between",
                      }}
                    >
                      {clubName}
                      <DownOutlined
                        style={{
                          "margin-left": "100px",
                        }}
                      ></DownOutlined>
                    </Space>
                  </a>
                </Dropdown>
              </div>
            </div>
          </div>
          <div>
            {clubSelected && (
              <div
                style={{
                  width: "20%",
                  "text-align": "center",
                  "margin-top": "30px",
                  padding: "20px",
                  backgroundColor: "white",
                  color: "#006E7F",
                  "margin-left": "auto",
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
                <p style={{ fontWeight: "bold", fontSize: "20px" }}>
                  {clubSelected.name}
                </p>
                <p>{clubSelected.address}</p>
                <Button
                  style={{
                    backgroundColor: "#006E7F",
                    color: "white",
                    marginTop: "15px",
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
        </div>
      </div>
    </div>
  );
}
export default SelectClub;
