import { Dropdown, Space, Input } from "antd";
import { useEffect, useState } from "react";
import TrainingClassesByClub from "../components/TrainingClassesByClub";

const SearchClasses = () => {
  const { Search } = Input;

  const accessToken = localStorage.getItem("accessToken");
  const [clubs, setClubs] = useState([]);
  const [typeId, setTypeId] = useState("");
  const [typeItems, setTypeItems] = useState();
  const [nameDropdownTypes, setNameDropdownTypes] =
    useState("Select class type");
  const [data, setData] = useState([]);
  const [trainerName, setTrainerName] = useState("");
  useEffect(() => {
    if (typeId !== "") {
      getClassesForNext7Days();
    }
  }, [typeId, setTypeId]);
  useEffect(() => {
    if (trainerName !== "") {
      getClassesForNext7Days();
    }
  }, [trainerName, setTrainerName]);
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
    getTrainingClassTypes();
  }, []);

  const handleMenuClickTypes = ({ key }) => {
    setTrainerName("");
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
          if (typeId !== "") {
            newData = newData.filter(
              (d) => typeId === d.trainingClassHour.trainingClassType.id
            );
          }
          if (trainerName !== "") {
            newData = newData.filter((d) =>
              d.trainerName.toUpperCase().includes(trainerName.toUpperCase())
            );
          }
          console.log("newData")
          console.log(newData)
          setData(newData);
          let clubs = newData.map((d) => d.club);
          setClubs(removeJSONDuplicatesClubs(clubs));
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };

  const menuPropsTypes = {
    items: typeItems,
    onClick: handleMenuClickTypes,
  };
  const onSearchByTrainer = (trainerName) => {
    setTrainerName(trainerName);
    setTypeId("");
  };
  return (
    <div>
      <div>
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
        <Search
          placeholder="search by trainer"
          onSearch={onSearchByTrainer}
          style={{ width: 200 }}
        />
        {clubs !== [] &&
          clubs.map((club) => {
            return (
              <div key={club.id}>
                <TrainingClassesByClub
                  key={club.id}
                  parentToChild={{ club, data }}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};
export default SearchClasses;
