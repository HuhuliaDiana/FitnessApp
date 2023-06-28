import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";

import { useEffect, useState } from "react";
import MenuBar from "../components/MenuBar";
import TrainingClassesByDay from "../components/TrainingClassesByDay";

const ClassesSchedule = () => {
  const [namesOfWeekDays, setNamesOfWeekDays] = useState([]);
  const [clubId, setClubId] = useState(1);
  const [typeId, setTypeId] = useState(4);
  const [clubItems, setClubItems] = useState();
  const [typeItems, setTypeItems] = useState();
  const [nameDropdownClubs, setNameDropdownClubs] = useState("Select a club");
  const [nameDropdownTypes, setNameDropdownTypes] = useState("ANY TYPE");
  const accessToken = localStorage.getItem("accessToken");

  const [data, setData] = useState([]);
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
          setNameDropdownClubs(data.name);
          setClubId(data.id);
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err.message);
    }
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
          return Promise.reject("Cannot get subscription of current user.");
        })
        .then((data) => {
          setNameDropdownClubs(data.club.name);
          setClubId(data.club.id);
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err.message);
    }
  };

  const getClassesForNext7Days = () => {
    try {
      fetch(`http://localhost:8080/api/class/next-7-days`, {
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
          return Promise.reject("Cannot fetch classes for next 7 days.");
        })
        .then((data) => {
          let newData = data;
          if (clubId) {
            newData = newData.filter((d) => d.club.id === clubId);
          }
          if (typeId && typeId !== 4) {
            newData = newData.filter(
              (d) => typeId === d.trainingClassHour.trainingClassType.id
            );
            console.log(newData);
          }
          let namesWeekDays = newData.map((trainingClass) => {
            const nameOfWeekDay = new Date(
              trainingClass.classDate
            ).toLocaleDateString("en-us", {
              weekday: "long",
            });
            const localDateOfClass = new Date(
              trainingClass.classDate
            ).toLocaleDateString();
            const dayOfMonth = new Date(trainingClass.classDate).getDate();
            const month = new Date(trainingClass.classDate).toLocaleDateString(
              "en-us",
              {
                month: "long",
              }
            );
            return {
              id: trainingClass.id,
              nameOfWeekDay: nameOfWeekDay,
              localDateOfClass: localDateOfClass,
              dayOfMonth: dayOfMonth,
              month: month,
            };
          });
          setData(newData);
          setNamesOfWeekDays(removeJSONDuplicates(namesWeekDays));
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };

  const removeJSONDuplicates = (namesOfWeekDays) => {
    var uniqueArray = [];
    for (var i = 0; i < namesOfWeekDays.length; i++) {
      if (
        !uniqueArray.find(
          (x) => x.nameOfWeekDay === namesOfWeekDays[i].nameOfWeekDay
        )
      ) {
        uniqueArray.push(namesOfWeekDays[i]);
      }
    }
    return uniqueArray;
  };
  //dropdown of clubs
  const getClubs = () => {
    try {
      fetch(`http://localhost:8080/api/club`, {
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
          const items = data.map((club) => {
            return {
              key: club.id,
              label: club.name,
            };
          });
          setClubItems(items);
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };
  const getTrainingClassTypes = () => {
    try {
      fetch(`http://localhost:8080/api/class/types`, {
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
          let types = [];
          const anyType = { key: 4, label: "ANY TYPE" };
          types.push(anyType);
          data.forEach((type) => {
            types.push({
              key: type.id,
              label: type.name,
            });
          });

          setTypeItems(types);
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    console.log("get classes for typeid: " + typeId);
    getClassesForNext7Days();
  }, [clubId, typeId]);
  useEffect(() => {
    console.log(data);
  }, [data, setData]);

  useEffect(() => {
    getClubById();
    getSubscriptionOfUser();
    getClubs();
    getTrainingClassTypes();
    getClassesForNext7Days();
  }, []);
  useEffect(() => {}, [data]);

  const handleMenuClickClubs = ({ key }) => {
    const item = clubItems.find((i) => i.key == key);
    setNameDropdownClubs(item.label);
    const clubId = item.key;
    setClubId(clubId);
  };
  const handleMenuClickTypes = ({ key }) => {
    console.log(key);
    const item = typeItems.find((i) => i.key == key);
    setNameDropdownTypes(item.label);
    const idOfType = item.key;
    setTypeId(idOfType);
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
              Book a class
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
              marginBottom: "50px",
              justifyContent: "center",
              "margin-left": "10%",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent:"center",
                "margin-left": "auto",
                "margin-right": "auto",
                justifyContent: "center",
              }}
            >
              <Dropdown
                menu={{ items: clubItems, onClick: handleMenuClickClubs }}
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
                      "margin-right": "30px",
                    }}
                  >
                    {nameDropdownClubs}
                    <DownOutlined style={{ width: "30px" }}></DownOutlined>
                  </Space>
                </a>
              </Dropdown>

              <Dropdown
                menu={{ items: typeItems, onClick: handleMenuClickTypes }}
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
                    }}
                  >
                    {nameDropdownTypes}
                    <DownOutlined
                      style={{
                        "margin-left": "30px",
                      }}
                    ></DownOutlined>
                  </Space>
                </a>
              </Dropdown>
            </div>
            <div
              style={{
                "margin-top": "50px",
                display: "flex",
                justifyContent:"center",
                "flex-direction": "row",
                // border:"2px solid green",
                justifyContent: "center",
                // width: "100%",
              }}
            >
              {data !== [] &&
                namesOfWeekDays !== [] &&
                namesOfWeekDays.map((nameOfWeekDay) => {
                  return (
                    <div
                      key={nameOfWeekDay.id}
                      style={{
                        width: "200px",
                        "margin-right": "20px",
                      }}
                    >
                      <div
                        style={{
                          backgroundColor: "#006E7F",
                          color: "white",
                          padding: "10px 5px 10px 5px",
                          width: "200px",
                          boxShadow:
                            "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
                        }}
                      >
                        <text>
                          <b>{nameOfWeekDay.nameOfWeekDay}</b>
                        </text>
                        <br></br>
                        <text style={{ fontSize: "15px" }}>
                          {nameOfWeekDay.dayOfMonth} {nameOfWeekDay.month}
                        </text>
                      </div>
                      <TrainingClassesByDay
                        parentToChild={{
                          nameOfWeekDay,
                          data,
                        }}
                      />
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ClassesSchedule;
