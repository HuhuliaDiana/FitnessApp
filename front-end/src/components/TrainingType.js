import { Button } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const TrainingType = (props) => {
  const navigate = useNavigate();

  const training = props.parentToChild.training;
  const trainerName= props.parentToChild.trainerName;
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
        trainerName: trainerName,
      },
    });
  };
  return (
    <div>
      <p>
        PERSONAL TRAINING {training.sessionsNumber} SESSIONS {trainingName}
      </p>
      <p>{training.price} EUR</p>
      <Button onClick={handleOnClickChoose}>Choose</Button>
    </div>
  );
};
export default TrainingType;
