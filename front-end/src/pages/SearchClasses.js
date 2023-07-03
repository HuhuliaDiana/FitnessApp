import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Input, Space } from "antd";
import { useEffect, useState } from "react";
import MenuBar from "../components/MenuBar";
import TrainingClassesByClub from "../components/TrainingClassesByClub";

const SearchClasses = () => {
  const { Search } = Input;

  const accessToken = localStorage.getItem("accessToken");
  const [clubs, setClubs] = useState([]);
  const [typeId, setTypeId] = useState();
  const [typeItems, setTypeItems] = useState();
  const [nameDropdownTypes, setNameDropdownTypes] = useState("Choose a type");
  const [data, setData] = useState([]);
  const [trainerName, setTrainerName] = useState("");
  const [inputValue, setInputValue] = useState("");
  useEffect(() => {
    if (typeId) {
      getClassesForNext7Days();
    }
  }, [typeId, setTypeId]);
  // useEffect(() => {
  //   getClassesForNext7Days();
  // }, []);
  useEffect(() => {
    if (trainerName !== "") {
      getClassesForNext7Days();
    }
  }, [trainerName, setTrainerName]);
  const getTrainingClassTypes = () => {
    try {
      fetch(`http://localhost:8080/api/class/types/`, {
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
          // const anyType = { key: 4, label: "ANY TYPE" };
          // types.push(anyType);
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
    getTrainingClassTypes();
  }, []);

  const handleMenuClickTypes = ({ key }) => {
    setTrainerName("");
    setInputValue("");
    const item = typeItems.find((i) => i.key == key);
    setNameDropdownTypes(item.label);
    const typeId = item.key;
    setTypeId(typeId);
  };

  const removeJSONDuplicatesClubs = (clubs) => {
    var uniqueArray = [];
    for (var i = 0; i < clubs.length; i++) {
      if (!uniqueArray.find((x) => x.id === clubs[i].id)) {
        uniqueArray.push(clubs[i]);
      }
    }
    return uniqueArray;
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
          if (typeId && typeId !== 4) {
            newData = newData.filter(
              (d) => typeId === d.trainingClassHour.trainingClassType.id
            );
          }
          if (trainerName !== "") {
            newData = newData.filter((d) =>
              d.trainerName.toUpperCase().includes(trainerName.toUpperCase())
            );
          }
          setData(newData);
          let clubs = newData.map((d) => d.club);
          setClubs(removeJSONDuplicatesClubs(clubs));
          console.log(newData);
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {}, [nameDropdownTypes]);

  const onSearchByTrainer = (trainerName) => {
    setTrainerName(trainerName);
    setTypeId(null);
    setNameDropdownTypes("Choose a type");
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
              Search for a class
            </div>
          </div>
          <div
            style={{
              "box-shadow": "rgba(0, 0, 0, 0.24) 0px 3px 8px",
              marginTop: "30px",
              display: "flex",
              padding: "20px",
              "flex-direction": "column",
              width: "90%",
              marginBottom: "30px",
              justifyContent: "center",
              marginRight:"auto",
              marginLeft:"auto",
            }}
          >
            <div
              style={{
                width: "30%",
                display: "flex",
                display: "flex",
                "margin-left": "auto",
                "margin-right": "auto",
              }}
            >
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
                      "margin-right": "30px",
                    }}
                  >
                    {nameDropdownTypes}
                    <DownOutlined style={{ width: "30px" }}></DownOutlined>
                  </Space>
                </a>
              </Dropdown>
              <Search
                placeholder="search by trainer"
                onSearch={onSearchByTrainer}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                style={{
                  width: 200,
                  "margin-top": "auto",
                  "margin-bottom": "auto",
                }}
              />
            </div>
            <div
              style={{
                "margin-top": "30px",
                display: "flex",
                "flex-direction": "column",
              }}
            >
              {clubs.length !== 0 ? (
                clubs.map((club) => {
                  return (
                    <div
                      key={club.id}
                      style={{
                        width: "100%",
                        "margin-right": "20px",
                      }}
                    >
                      <TrainingClassesByClub
                        key={club.id}
                        parentToChild={{ club, data }}
                      />
                    </div>
                  );
                })
              ) : (
                <div style={{ marginTop: "3%" }}>
                  <div>
                    <img
                      src="search.svg"
                      alt="image"
                      style={{ width: "20%" }}
                    ></img>
                  </div>
                  <div
                    style={{
                      color: "#EE5007",
                      marginTop: "3%",
                      fontSize: "20px",
                      marginBottom: "2%",
                    }}
                  >
                    Search a training class by type or trainer's name.
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SearchClasses;
