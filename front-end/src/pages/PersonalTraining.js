import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { Dropdown, Input, Space } from "antd";
import { useEffect, useState } from "react";
import MenuBar from "../components/MenuBar";
import Trainer from "../components/Trainer";

const PersonalTraining = () => {
  const accessToken = localStorage.getItem("accessToken");
  const [clubId, setClubId] = useState(1);
  const [clubsDropdown, setClubsDropdown] = useState([]);
  const [clubName, setClubName] = useState("");

  const [trainerName, setTrainerName] = useState("");
  const [trainers, setTrainers] = useState([]);

  const getDropdownMemberships = () => {
    try {
      fetch("http://localhost:8080/api/membership", {
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
          return Promise.reject("Cannot get memberships.");
        })
        .then((data) => {
          const newClubs = [];
          data.forEach((membership) => {
            const children = [];
            membership.clubs.forEach((club) => {
              const newClub = {
                id: club.id,
                key: membership.id + "-" + club.id,
                label: club.name,
              };
              children.push(newClub);
            });
            const newCity = {
              key: membership.id.toString(),
              label: membership.name,
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
        setClubId(data.id);
        setClubName(data.name);
      });
  };
  const getSubscriptionOfUser = () => {
    try {
      fetch("http://localhost:8080/api/user-subscription", {
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
          if (response.status == 404) {
            return Promise.reject("User subscription not found.");
          }
          return Promise.reject("Cannot get subscription of current user.");
        })
        .then((data) => {
          setClubName(data.club.name);
          setClubId(data.club.id);
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err.message);
    }
  };
  const getClubById = () => {
    try {
      fetch("http://localhost:8080/api/club/1", {
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
          return Promise.reject("Cannot get first club.");
        })
        .then((data) => {
          setClubName(data.name);
          setClubId(data.id);
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    getClubById();
    getSubscriptionOfUser();
    getDropdownMemberships();
    getTrainers();
  }, []);

  // const onSearch = (value) => {
  //   setTrainerName(value);
  // };

  const getTrainers = () => {
    try {
      fetch("http://localhost:8080/api/personal-trainer", {
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
          return Promise.reject("Cannot fetch trainers.");
        })
        .then((data) => {
          let trainersFiltered = data;
          if (clubId) {
            trainersFiltered = trainersFiltered.filter(
              (trainer) =>
                trainer.clubs.filter((club) => club.id === clubId).length !== 0
            );
          }
          if (trainerName !== "") {
            trainersFiltered = trainersFiltered.filter((trainer) =>
              trainer.name.toLowerCase().includes(trainerName.toLowerCase())
            );
          }
          console.log(trainersFiltered);
          setTrainers(trainersFiltered);
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err.message);
    }
  };

  const onClick = ({ key }) => {
    const ids = key.split("-");
    const clubId = ids[1];
    console.log(clubId);
    getClub(clubId);
  };

  useEffect(() => {
    getTrainers();
  }, [clubId, setClubId, trainerName, setTrainerName]);

  // const handleOnClickCancel = () => {
  //   setTrainerName("");
  // };

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
            }}
          >
            Welcome to Fit & Repeat
          </p>
        </div>
        <div className="child">
          <div
            style={{
              "box-shadow": "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
              display: "flex",
              height: "50px",
              "flex-direction": "row",
              "justify-content": "space-between",
            }}
          >
            <div
              style={{
                "margin-top": "auto",
                "margin-bottom": "auto",
                "margin-left": "20px",
              }}
            >
              Search for a Personal Trainer
            </div>
          </div>
          <div
            style={{
              "box-shadow": "rgba(0, 0, 0, 0.24) 0px 3px 8px",
              "margin-top": "50px",
              display: "flex",
              padding: "20px",
              "flex-direction": "column",
              width: "80%",
              justifyContent: "center",
              "margin-left": "10%",
            }}
          >
            <div
              style={{
                display: "flex",
                "margin-left": "auto",
                "margin-right": "auto",
              }}
            >
              <div style={{ "margin-left": "auto" }}>
                {clubName && (
                  <Dropdown menu={{ items: clubsDropdown, onClick }}>
                    <a
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                    >
                      <Space
                        style={{
                          "box-shadow": " rgba(0, 0, 0, 0.24) 0px 3px 8px",
                          padding: "8px",
                          "margin-right": "30px",
                        }}
                      >
                        {clubName}
                        <DownOutlined
                          style={{
                            "margin-left": "30px",
                          }}
                        />
                      </Space>
                    </a>
                  </Dropdown>
                )}
              </div>

              <Input
                size="default size"
                value={trainerName}
                onChange={(e) => setTrainerName(e.target.value)}
                placeholder="Search by name"
                style={{ width: 230, "margin-left": "30px" }}
                prefix={<UserOutlined />}
              />
            </div>

            <div
              style={{
                display: "flex",
                "margin-top": "50px",
                justifyContent: "center",
              }}
            >
              {trainers.length !== 0 &&
                trainers.map((trainer) => {
                  return <Trainer key={trainer.id} parentToChild={trainer} />;
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PersonalTraining;
