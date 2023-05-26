import { Button, Space, DatePicker } from "antd";
import { useState } from "react";

const MembershipType = (props) => {
  const subscription = props.parentToChild.subscription;
  const clubId = props.parentToChild.clubId;
  const accessToken = localStorage.getItem("accessToken");
  const id = subscription.id;
  const [localDate, setLocalDate] = useState("");
  const subPeriodName = subscription.subscriptionPeriod.name;
  const array = subPeriodName.split("_");
  let formattedSubscriptionPeriodName = "";
  array.forEach((a) => {
    formattedSubscriptionPeriodName += a + " ";
  });
  console.log(formattedSubscriptionPeriodName);

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
          console.log(response);
        })
        .then((data) => {
          console.log(data);
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
    <div
      style={{
        "box-shadow":"rgba(0, 0, 0, 0.24) 0px 3px 8px",
        width: "25%",
        "margin-bottom": "50px",
        height: "100px",
        padding:"20px"
      }}
    >
      {/* <Space direction="vertical">
        <DatePicker
          onChange={onChange}
          disabledDate={(d) => !d || d.isBefore(new Date())}
        />
      </Space> */}
      <p>
        {subscription.membership.name} {formattedSubscriptionPeriodName}
      </p>
      <p>{subscription.price}</p>
      {/* <Button onClick={buy}>Buy membership</Button> */}
    </div>
  );
};
export default MembershipType;
