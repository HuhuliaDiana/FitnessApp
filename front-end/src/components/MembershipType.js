import { Button, Space, DatePicker } from "antd";
import { useState } from "react";
const MembershipType = (props) => {
  const subscription = props.parentToChild.subscription;
  const clubId = props.parentToChild.clubId;
  const accessToken = localStorage.getItem("accessToken");
  const id = subscription.id;
  const [date, setDate] = useState("");

  const buy = () => {
    if (date !== "") {
      buyMembership();
    } else {
      console.log("Pick a date!")
    }
  };
  const buyMembership = () => {
    try {
      console.log(date);
      fetch(`http://localhost:8080/api/user-subscription/buy`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ id: id, date: date, clubId: clubId }),
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
    setDate(new Date(dateString).toISOString().split("T")[0]);
  };
  return (
    <div>
      <Space direction="vertical">
        <DatePicker onChange={onChange} />
      </Space>
      <p>
        {subscription.membership.name} {subscription.subscriptionPeriod.name}
      </p>
      <p>{subscription.price}</p>
      {/* temporary- buy this membership */}
      <Button onClick={buy}>Buy membership</Button>
    </div>
  );
};
export default MembershipType;
