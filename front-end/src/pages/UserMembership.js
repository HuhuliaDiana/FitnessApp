import { DownOutlined } from "@ant-design/icons";
import { Button, DatePicker, Dropdown, InputNumber, Space } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MenuBar from "../components/MenuBar";

import moment from "moment";
import RenewMembership from "./RenewMembership";
import UpgradeMembership from "./UpgradeMembership";
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
  const [option, setOption] = useState();

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
    setOption("transfer");
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
      moment(new Date(dateString)).toISOString().split("T")[0]
    );
  };
  const selectNoDaysToFreeze = (value) => {
    setNumberOfDays(value);
  };
  const styleBtn = {
    width: "200px",
    color: "white",
    backgroundColor: "#006E7F",
    fontFamily: "'Montserrat', sans-serif",
    padding: "8px",
    height: "100%",
  };
  const styleP = {
    fontSize: "20px",
    marginBottom: "60px",
    color: "#006E7F",
    fontWeight: "bold",
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
            boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
            padding: "3px",
          }}
        >
          <p
            style={{
              fontSize: "120%",
              fontWeight: "bold",
              marginLeft: "15px",
            }}
          >
            Welcome to Fit & Repeat
          </p>
        </div>
        <div className="child">
          <div
            style={{
              boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
              display: "flex",
              height: "50px",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                marginTop: "auto",
                marginBottom: "auto",
                marginLeft: "20px",
              }}
            >
              Your membership
            </div>
          </div>
          <div
            style={{
              boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
              marginTop: "50px",
              display: "flex",
              padding: "20px",
              flexDirection: "column",
              width: "60%",
              justifyContent: "center",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            {subscription && (
              <div style={{ border: "", display: "flex" }}>
                <div
                  style={{
                    border: "",
                    width: "60%",
                    margin: "auto",
                    backgroundColor: "",
                    color: "",
                  }}
                >
                  <p
                    style={{
                      fontSize: "25px",
                      fontWeight: "bold",
                      color: "#006E7F",
                    }}
                  >
                    {subscription.subscription.membership.name}{" "}
                    {subscriptionPeriodName}
                  </p>
                  <p style={{}}>
                    Available from{" "}
                    <b style={{ color: "#006E7F" }}>{subscription.startDate}</b>{" "}
                    to{" "}
                    <b style={{ color: "#006E7F" }}>{subscription.endDate}</b>
                  </p>
                </div>
                <div>
                  <img
                    alt="image"
                    src="membership.svg"
                    style={{ width: "50%", padding: "20px" }}
                  ></img>
                </div>
              </div>
            )}
            <div
              style={{
                border: "",
                marginTop: "50px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Button
                style={styleBtn}
                onClick={() => {
                  navigate("/buy-membership");
                }}
              >
                Buy membership
              </Button>
              <Button style={styleBtn} onClick={() => setOption("renew")}>
                Renew membership
              </Button>
              <Button style={styleBtn} onClick={() => setOption("upgrade")}>
                Upgrade membership
              </Button>
              <Button style={styleBtn} onClick={changeClubForMembership}>
                Transfer membership
              </Button>
              {daysToFreeze !== 0 && noDaysLeftToFreeze !== 0 && (
                <div>
                  <Button onClick={() => setOption("freeze")} style={styleBtn}>
                    Freeze membership
                  </Button>
                </div>
              )}
            </div>
          </div>
          {option && (
            <div
              style={{
                boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                marginTop: "40px",
                display: "flex",
                padding: "20px",
                flexDirection: "column",
                width: "60%",
                justifyContent: "center",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              {/* transfer */}
              {option === "transfer" && (
                <div style={{ border: "", display: "flex" }}>
                  <div style={{ width: "50%", margin: "auto" }}>
                    <img
                      src="transfer.svg"
                      alt="image"
                      style={{ width: "40%", padding: "10px" }}
                    ></img>
                  </div>
                  <div
                    style={{
                      width: "50%",
                      border: "",
                      margin: "auto",
                      border: "",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "20px",
                        marginBottom: "40px",
                        color: "#006E7F",
                        fontWeight: "bold",
                      }}
                    >
                      Transfer memership to another club
                    </div>
                    <div
                      style={{
                        width: "60%",
                        margin: "auto",
                        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                        padding: "10px",
                      }}
                    >
                      <Dropdown menu={{ items: clubsDropdown, onClick }}>
                        <a
                          onClick={(e) => {
                            e.preventDefault();
                          }}
                        >
                          <Space
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            {clubName}
                            <DownOutlined />
                          </Space>
                        </a>
                      </Dropdown>
                    </div>
                  </div>
                </div>
              )}

              {/* finish transfer */}

              {/* freeze membership */}
              {option === "freeze" && (
                <div>
                  <div style={{ border: "", display: "flex", padding: "20px" }}>
                    <div style={{ width: "50%", margin: "auto" }}>
                      <img
                        src="freeze.svg"
                        alt="image"
                        style={{ width: "70%" }}
                      ></img>
                    </div>
                    <div
                      style={{
                        border: "",
                        width: "60%",
                        margin: "auto",
                      }}
                    >
                      <p
                        style={{
                          fontSize: "20px",
                          marginBottom: "30px",
                          color: "#006E7F",
                          fontWeight: "bold",
                        }}
                      >
                        Freeze membership
                      </p>
                      <div
                        style={{
                          border: "",
                          display: "flex",
                          border: "",
                          justifyContent: "center",
                        }}
                      >
                        <p style={{ border: "" }}>Pick a start date:</p>
                        <Space
                          direction="vertical"
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            marginLeft: "80px",
                          }}
                        >
                          <DatePicker
                            onChange={selectDateStartFreezing}
                            disabledDate={(d) =>
                              d.isBefore(new Date(startDayOfMembership)) ||
                              (dataStartFreeze &&
                                (d.isAfter(dataStartFreeze) ||
                                  d.isSame(dataStartFreeze)) &&
                                dataEndFreeze &&
                                (d.isBefore(dataEndFreeze) ||
                                  d.isSame(dataEndFreeze)))
                            }
                          />
                        </Space>
                      </div>
                      <div
                        style={{
                          border: "",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <p>Enter number of days to freeze:</p>
                        <InputNumber
                          style={{
                            height: "100%",
                            display: "flex",
                            justifyContent: "center",
                            marginTop: "auto",
                            marginLeft: "30px",
                            marginBottom: "auto",
                          }}
                          min={1}
                          max={30}
                          defaultValue={1}
                          onChange={selectNoDaysToFreeze}
                        />
                      </div>
                      <div>
                        <Button
                          onClick={freezeMembership}
                          style={{
                            width: "180px",
                            "background-color": "#006E7F",
                            fontFamily: "'Montserrat', sans-serif",
                            marginTop: "40px",
                            color: "white",
                          }}
                        >
                          Freeze membership
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* disable date till the beginning of subscription and already frozen days */}
                </div>
              )}
              {/* finish freeze membership */}

              {/* upgrade */}
              {option === "upgrade" && (
                <div>
                  <p style={styleP}>
                    Choose memership to upgrade the current one
                  </p>
                  <UpgradeMembership />
                </div>
              )}
              {/* finishupgrade */}
              {/* renew */}
              {option === "renew" && (
                <div>
                  <p style={styleP}>
                    Choose memership to renew the current one
                  </p>
                  <RenewMembership />
                </div>
              )}
              {/* finish renew */}
            </div>
          )}
        </div>

        {option === "transfer" && club && (
          <div
            style={{
              width: "20%",
              textAlign: "center",
              marginTop: "40px",
              padding: "20px",
              backgroundColor: "white",
              color: "#006E7F",
              "margin-left": "auto",
              "margin-right": "auto",
              // marginBottom: "50px",
              "box-shadow": "rgba(0, 0, 0, 0.24) 0px 3px 8px",
            }}
          >
            {/* <div>
              <img
                alt="image"
                src="current_location.svg"
                style={{ width: "50%" }}
              ></img>
            </div> */}
            <p>{club.name}</p>
            <p> {club.address}</p>
            <Button
              onClick={handleOnClickTransfer}
              style={{
                backgroundColor: "#006E7F",
                color: "white",
                marginTop: "20px",
                fontFamily: "'Montserrat', sans-serif",
              }}
            >
              Transfer to {club.name}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
export default UserMembership;
