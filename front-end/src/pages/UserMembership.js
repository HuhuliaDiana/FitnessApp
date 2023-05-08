import { Button } from "antd";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Dropdown, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";

const UserMembership = () => {
  const accessToken = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  const [subscription, setSubscription] = useState();
  const [subscriptionPeriodName, setSubscriptionPeriodName] = useState();
  const [clubName, setClubName] = useState("Select a club");
  const [transfer, setTransfer] = useState(false);
  const [clubsDropdown, setClubsDropdown] = useState();
  const [clubSelected, setClubSelected] = useState();
  const [club, setClub] = useState();
  const getUserSubscription = () => {
    try {
      fetch(`http://localhost:8080/api/user-subscription`, {
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
          console.log(data.id);
          setSubscription(data);
          const subscriptionPeriodName =
            data.subscription.subscriptionPeriod.name;
          const array = subscriptionPeriodName.split("_");
          setSubscriptionPeriodName(array[0] + " " + array[1] + " " + array[2]);
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };
  const getClubsWithMembershipId = () => {
    try {
      fetch(
        `http://localhost:8080/api/club/has-membership/${subscription.subscription.membership.id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          method: "get",
        }
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject("Cannot fetch clubs.");
        })
        .then((data) => {
          console.log(data);
          const clubs = data.map((club) => {
            return {
              key: club.id,
              label: club.name,
            };
          });
          setClubsDropdown(clubs);
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };
  const getClub = () => {
    fetch(`http://localhost:8080/api/club/${clubSelected}`, {
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
        return Promise.reject("Cannot get club.");
      })
      .then((data) => {
        setClub(data);
      });
  };
  useEffect(() => {
    if (clubSelected) getClub();
  }, [clubSelected, setClubSelected]);
  useEffect(() => {
    getUserSubscription();
  }, []);
  useEffect(() => {
    if (transfer) getClubsWithMembershipId();
  }, [transfer, setTransfer]);

  const changeClubForMembership = () => {
    setTransfer(true);
  };
  const onClick = ({ key }) => {
    const item = clubsDropdown.find((i) => i.key == key);
    setClubName(item.label);
    setClubSelected(item.key);
  };
  const handleOnClickTransfer = () => {
    fetch(
      `http://localhost:8080/api/user-subscription/transfer/${clubSelected}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        method: "put",
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject("Cannot get club.");
      })
      .then((data) => {
        console.log(data);
      });
  };
  return (
    <div>
      {subscription && (
        <p>
          {subscription.subscription.membership.name} {subscriptionPeriodName}
          <br />
          Period of availability:{" "}
          {`${subscription.startDate} to ${subscription.endDate}`}
        </p>
      )}
      <Button
        onClick={() => {
          navigate("/select-club");
        }}
      >
        Renew membership
      </Button>
      <Button
        onClick={() => {
          navigate("/upgrade-membership");
        }}
      >
        Upgrade membership
      </Button>
      <Button onClick={changeClubForMembership}>
        Transfer membership to another club
      </Button>
      {transfer && (
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
      )}
      {club && (
        <div>
          <p>
            {club.name} {club.address}
          </p>
          <Button onClick={handleOnClickTransfer}>
            Transfer to {club.name}
          </Button>
        </div>
      )}
    </div>
  );
};
export default UserMembership;
