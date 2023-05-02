import { DownOutlined } from "@ant-design/icons";
import { Button, Dropdown, Space } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//select club will be by default the club from subscription

function SelectClub() {
  const accessToken = localStorage.getItem("accessToken");
  //   const { auth, setAuth, isLoggedIn, setIsLoggedIn } = useAuth();
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
    <>
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
      {clubSelected && (
        <div>
          <p>{clubSelected.name}</p>
          <p>{clubSelected.address}</p>
          <Button onClick={onOpenBuyMembershipPage}>Continue</Button>
        </div>
      )}
    </>
  );
}
export default SelectClub;
