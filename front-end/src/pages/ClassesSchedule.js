import { Dropdown, Space } from "antd";
import { useEffect, useState } from "react";
import TrainingClassesByDay from "../components/TrainingClassesByDay";

const ClassesSchedule = () => {
  const accessToken = localStorage.getItem("accessToken");
  const [namesOfWeekDays, setNamesOfWeekDays] = useState([]);
  const [clubId, setClubId] = useState("");
  const [typeId, setTypeId] = useState("");
  const [clubItems, setClubItems] = useState();
  const [typeItems, setTypeItems] = useState();
  const [classTypes, setClassTypes] = useState();
  const [nameDropdownClubs, setNameDropdownClubs] = useState("Select a club");
  const [nameDropdownTypes, setNameDropdownTypes] =
    useState("Select class type");

  const getSubscriptionOfUser = () => {
    try {
      fetch("http://localhost:8080/api/subscription", {
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
          console.log(clubId);
          let newData = data;
          if (clubId !== "") {
            newData = data.filter((d) => d.club.id == clubId);
          }
          if (typeId !== "") {
            newData = newData.filter(
              (d) => typeId == d.trainingClassHour.trainingClassType.id
            );
          }
          const namesOfWeekDays = newData.map((c) => {
            const nameOfWeekDay = new Date(c.classDate).toLocaleDateString(
              "en-us",
              {
                weekday: "long",
              }
            );
            const localDateOfClass = new Date(c.classDate).toLocaleDateString();
            const dayOfMonth = new Date(c.classDate).getDate();
            const month = new Date(c.classDate).toLocaleDateString("en-us", {
              month: "long",
            });
            return {
              id: c.id,
              nameOfWeekDay: nameOfWeekDay,
              localDateOfClass: localDateOfClass,
              dayOfMonth: dayOfMonth,
              month: month,
            };
          });
          setNamesOfWeekDays(removeJSONDuplicates(namesOfWeekDays));
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
  //for dropdown of clubs
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
    getClassesForNext7Days();
  }, [clubId, setClubId]);

  useEffect(() => {
    getClassesForNext7Days();
  }, [typeId, setTypeId]);

  useEffect(() => {
    getClubs();
    getTrainingClassTypes();
    getSubscriptionOfUser();
    getClassesForNext7Days();
  }, []);

  const handleMenuClickClubs = ({ key }) => {
    const item = clubItems.find((i) => i.key == key);
    setNameDropdownClubs(item.label);
    const clubId = item.key;
    setClubId(clubId);
  };
  const handleMenuClickTypes = ({ key }) => {
    const item = typeItems.find((i) => i.key == key);
    setNameDropdownTypes(item.label);
    const typeId = item.key;
    setTypeId(typeId);
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
    <div>
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
      {namesOfWeekDays !== [] &&
        namesOfWeekDays.map((nameOfWeekDay) => {
          return (
            <div key={nameOfWeekDay.id}>
              <p>
                <b>
                  {nameOfWeekDay.nameOfWeekDay} - {nameOfWeekDay.dayOfMonth}{" "}
                  {nameOfWeekDay.month}
                </b>
              </p>
              <TrainingClassesByDay parentToChild={{ nameOfWeekDay, clubId }} />
            </div>
          );
        })}
    </div>
  );
};
export default ClassesSchedule;
