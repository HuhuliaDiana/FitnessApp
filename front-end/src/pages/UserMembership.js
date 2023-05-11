import { DownOutlined } from "@ant-design/icons";
import { Button, DatePicker, Dropdown, InputNumber, Space } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
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
  const [daysToFreeze, setDaysToFreeze] = useState(0);
  const [firstDayOfFreeze, setFirstDayOfFreeze] = useState();
  const [openDatePickerToFreeze, setOpenDatePickerToFreeze] = useState(false);
  const [numberOfDays, setNumberOfDays] = useState(0);
  const [noDaysLeftToFreeze, setNoDaysLeftToFreeze] = useState(0);
  const [startDayOfMembership, setStartDayOfMembership] = useState();
  const [dataStartFreeze, setDataStartFreeze] = useState();
  const [dataEndFreeze, setDataEndFreeze] = useState();

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
          return Promise.reject("Cannot get user subscription.");
        })
        .then((data) => {
          console.log(data);
          setDataStartFreeze(data.startFreeze);
          setDataEndFreeze(data.endFreeze);
          setStartDayOfMembership(data.startDate);
          setNoDaysLeftToFreeze(data.noDaysLeftToFreeze);
          if (
            data.subscription.subscriptionPeriod.name ===
            "FULL_TIME_1_MONTH_ROLLING"
          )
            setDaysToFreeze(0);
          else setDaysToFreeze(30);

          setSubscription(data);
          const subscriptionPeriodName =
            data.subscription.subscriptionPeriod.name;
          const array = subscriptionPeriodName.split("_");
          let subPeriodName = "";
          array.forEach((a) => {
            subPeriodName += a + " ";
          });
          setSubscriptionPeriodName(subPeriodName);
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
  const freezeMembership = () => {
    fetch(`http://localhost:8080/api/user-subscription/freeze`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      method: "put",
      body: JSON.stringify({ firstDayOfFreeze, numberOfDays }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject("Cannot freeze membership.");
      })
      .then((data) => {
        console.log(data);
      });
  };
  const selectDateStartFreezing = (dateString) => {
    setFirstDayOfFreeze(
      moment(new Date(dateString)).add(1, "days").toISOString().split("T")[0]
    );
  };
  const selectNoDaysToFreeze = (value) => {
    setNumberOfDays(value);
  };
  return (
    <div>
      {subscription && (
        <p>
          {subscription.subscription.membership.name} {subscriptionPeriodName}
          <br />
          Availability: {`${subscription.startDate} to ${subscription.endDate}`}
        </p>
      )}
      <Button
        onClick={() => {
          navigate("/buy-membership");
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
      {daysToFreeze !== 0 && noDaysLeftToFreeze !== 0 && (
        <div>
          <Button onClick={() => setOpenDatePickerToFreeze(true)}>
            Choose to freeze membership
          </Button>
        </div>
      )}
      {openDatePickerToFreeze === true && (
        <div>
          <Space direction="vertical">
            <DatePicker
              onChange={selectDateStartFreezing}
              disabledDate={(d) =>
                d.isBefore(new Date(startDayOfMembership)) ||
                (dataStartFreeze &&
                  (d.isAfter(dataStartFreeze) || d.isSame(dataStartFreeze)) &&
                  dataEndFreeze &&
                  (d.isBefore(dataEndFreeze) || d.isSame(dataEndFreeze)))
              }
            />
          </Space>
          <InputNumber
            min={1}
            max={30}
            defaultValue={1}
            onChange={selectNoDaysToFreeze}
          />
          ;<Button onClick={freezeMembership}>Freeze membership</Button>
          {/* disable date till the beginning of subscription and already frozen days */}
        </div>
      )}
    </div>
  );
};
export default UserMembership;
