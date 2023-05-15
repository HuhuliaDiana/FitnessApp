import { useLocation } from "react-router-dom";
import { Button, Space, DatePicker } from "antd";
import { useState } from "react";
import MenuBar from "../components/MenuBar";

const BuyPersonalTraining = () => {
  const location = useLocation();
  const [date, setDate] = useState("");
  const accessToken = localStorage.getItem("accessToken");

  const trainingId = location.state.trainingId;
  const trainerName = location.state.trainerName;
  const trainerId = location.state.trainerId;
  const buy = () => {
    if (date !== "") {
      buyTraining();
    } else {
      console.log("Pick a date!");
    }
  };
  const buyTraining = () => {
    try {
      fetch(`http://localhost:8080/api/user-training`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        method: "post",
        body: JSON.stringify({
          trainingId: trainingId,
          trainerId: trainerId,
          startDate: date,
        }),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject("Cannot buy training.");
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
    <div className="parent">
      <MenuBar></MenuBar>
      <div className="child">
        <Space direction="vertical">
          <DatePicker onChange={onChange} />
        </Space>
        <Button onClick={buy}>Buy training</Button>
      </div>
    </div>
  );
};
export default BuyPersonalTraining;
