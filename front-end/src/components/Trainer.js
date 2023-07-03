import { Button } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Trainer = (props) => {
  const navigate = useNavigate();
  const [srcImg, setSrcImg] = useState("");

  const trainer = props.parentToChild;
  useEffect(() => {
    switch (trainer.sex) {
      case "M":
        setSrcImg("/male-yellow.svg");
        break;
      default:
        setSrcImg("/female-orange.svg");
        break;
    }
  }, [trainer]);
  return (
    <div
      style={{
        "box-shadow": "rgba(0, 0, 0, 0.24) 0px 3px 8px",
        padding: "15px",
        "margin-right": "20px",
        "margin-left": "20px",
        width: "18%",
      }}
    >
      <div>
        <img src={srcImg} alt="image" style={{ width: "90%" }} />
      </div>
      <p style={{ color: "#006E7F", fontSize: "20px" }}>{trainer.name}</p>
      <Button
        style={{
          backgroundColor: "#006E7F",
          color: "white",
          "margin-top": "20px",
          "margin-bottom": "15px",
          "font-size": "100%",
          width: "100px",
          height: "38px",
        }}
        onClick={() => {
          navigate(`/trainer/${trainer.id}`);
        }}
      >
        Choose
      </Button>
    </div>
  );
};
export default Trainer;
