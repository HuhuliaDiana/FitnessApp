import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { Dropdown, Input, Space } from "antd";
import { useEffect, useState } from "react";
import Trainer from "../components/Trainer";
import MenuBar from "../components/MenuBar";


const PersonalTraining = () => {
  const accessToken = localStorage.getItem("accessToken");
  const [clubId, setClubId] = useState("");
  const [clubsDropdown, setClubsDropdown] = useState([]);
  const [clubName, setClubName] = useState("Select a club");

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
  useEffect(() => {
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
          console.log("club id: " + clubId);
          console.log("trainer name: " + trainerName);

          let trainersFiltered = data;
          if (clubId !== "") {
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
      <div className="child">
        <Dropdown menu={{ items: clubsDropdown, onClick }}>
          <a
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            <Space>
              {clubName}
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
        <Input
          size="default size"
          value={trainerName}
          onChange={(e) => setTrainerName(e.target.value)}
          placeholder="Search by name"
          style={{ width: 200 }}
          prefix={<UserOutlined />}
        />

        {/* <Search
        value={trainerName}
        onChange={(e) => setTrainerName(e.target.value)}
        placeholder="Search by name"
        onSearch={onSearch}
        style={{ width: 200 }}
      /> */}
        {trainers.length !== 0 &&
          trainers.map((trainer) => {
            return <Trainer key={trainer.id} parentToChild={trainer} />;
          })}
        {/* {trainerName !== "" && (
        <Button onClick={handleOnClickCancel}>Cancel</Button>
      )} */}
      </div>
    </div>
  );
};
export default PersonalTraining;
