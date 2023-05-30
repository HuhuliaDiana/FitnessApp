import { Button } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const TrainingType = (props) => {
  const navigate = useNavigate();

  const training = props.parentToChild.training;
  const trainer = props.parentToChild.trainer;
  const [trainingName, setTrainingName] = useState("");
  useEffect(() => {
    const trainingName = training.personalTrainingType.name;
    if (trainingName.includes("_")) {
      setTrainingName(
        trainingName.split("_")[0] + " " + trainingName.split("_")[1]
      );
    } else {
      setTrainingName(trainingName);
    }
  }, []);
  const handleOnClickChoose = () => {
    navigate("/buy-training", {
      state: {
        trainingId: training.id,
        trainerName: trainer.name,
        trainerId: trainer.id,
      },
    });
  };
  return (
    <div
      style={{
        "box-shadow": "rgba(0, 0, 0, 0.24) 0px 3px 8px",
        padding: "20px",
      }}
    >
      <p>
        PERSONAL TRAINING {training.sessionsNumber} SESSIONS <br />{" "}
        {trainingName}
      </p>
      <p>{training.price} EUR</p>
      <Button
        style={{
          backgroundColor: "#B22727",
          color: "white",
          "margin-top": "20px",
          height: "35px",
        }}
        onClick={handleOnClickChoose}
      >
        Choose
      </Button>
    </div>
  );
};
export default TrainingType;
