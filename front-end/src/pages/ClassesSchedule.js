import { Dropdown, Space } from "antd";
import { useEffect, useState } from "react";
import MenuBar from "../components/MenuBar";
import TrainingClassesByDay from "../components/TrainingClassesByDay";

const ClassesSchedule = () => {
  const [namesOfWeekDays, setNamesOfWeekDays] = useState([]);
  const [clubId, setClubId] = useState();
  const [typeId, setTypeId] = useState();
  const [clubItems, setClubItems] = useState();
  const [typeItems, setTypeItems] = useState();
  const [nameDropdownClubs, setNameDropdownClubs] = useState("Select a club");
  const [nameDropdownTypes, setNameDropdownTypes] =
    useState("Select class type");
  const accessToken = localStorage.getItem("accessToken");

  const [data, setData] = useState([]);

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
          if (typeId) {
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
          const types = data.map((type) => {
            return {
              key: type.id,
              label: type.name,
            };
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

  const menuPropsClubs = {
    items: clubItems,
    onClick: handleMenuClickClubs,
  };
  const menuPropsTypes = {
    items: typeItems,
    onClick: handleMenuClickTypes,
  };
  return (
    <div className="parent">
      <MenuBar></MenuBar>
      <div className="child">
        <Space wrap>
          <Dropdown.Button
            menu={menuPropsClubs}
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            {nameDropdownClubs}
          </Dropdown.Button>
        </Space>
        <Space wrap>
          <Dropdown.Button
            menu={menuPropsTypes}
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            {nameDropdownTypes}
          </Dropdown.Button>
        </Space>
        {data !== [] &&
          namesOfWeekDays !== [] &&
          namesOfWeekDays.map((nameOfWeekDay) => {
            return (
              <div key={nameOfWeekDay.id}>
                <p>
                  <b>
                    {nameOfWeekDay.nameOfWeekDay} - {nameOfWeekDay.dayOfMonth}{" "}
                    {nameOfWeekDay.month}
                  </b>
                </p>
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
  );
};
export default ClassesSchedule;
