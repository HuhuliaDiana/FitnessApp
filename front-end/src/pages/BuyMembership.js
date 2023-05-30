import { Button, DatePicker, Space } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MenuBar from "../components/MenuBar";
const BuyMembership = () => {
  const clubId = useParams().clubId;
  const accessToken = localStorage.getItem("accessToken");
  const [localDate, setLocalDate] = useState("");

  const id = useParams().id;
  useEffect(() => {
    getSubscriptionById();
  }, [id]);

  const buy = () => {
    if (localDate !== "") {
      buyMembership();
    } else {
      console.log("Pick a date!");
    }
  };
  const buyMembership = () => {
    try {
      console.log(localDate);
      fetch(`http://localhost:8080/api/user-subscription/buy`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ id, localDate, clubId }),
        method: "POST",
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((data) => {
          console.log(data);
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };
  const getSubscriptionById = () => {
    try {
      fetch(`http://localhost:8080/api/subscription/${id}`, {
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
          console.log(response);
        })
        .then((data) => {
          console.log(data);
          const subPeriodName = data.subscriptionPeriod.name;
          const array = subPeriodName.split("_");
          let formattedSubscriptionPeriodName = "";
          array.forEach((a) => {
            formattedSubscriptionPeriodName += a + " ";
          });
          console.log(formattedSubscriptionPeriodName);
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };
  const onChange = (dateString) => {
    setLocalDate(new Date(dateString).toISOString().split("T")[0]);
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
              Buy membership
            </div>
          </div>
          <div
            style={{
              boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
              marginTop: "50px",
              display: "flex",
              padding: "20px",
              flexDirection: "column",
              width: "80%",
              justifyContent: "center",
              marginLeft: "10%",
            }}
          >
            <div
              style={{
                width: "35%",
                display: "flex",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <Space direction="vertical">
                <DatePicker
                  onChange={onChange}
                  disabledDate={(d) => !d || d.isBefore(new Date())}
                />
              </Space>
              <Button onClick={buy}>Buy membership</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BuyMembership;
