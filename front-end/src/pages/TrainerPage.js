import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TrainingType from "../components/TrainingType";

const TrainerPage = () => {
  const accessToken = localStorage.getItem("accessToken");

  const id = useParams().id;
  const [trainer, setTrainer] = useState();
  const [trainings, setTrainings] = useState([]);
  const getTrainerById = () => {
    try {
      fetch(`http://localhost:8080/api/personal-trainer/${id}`, {
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
          return Promise.reject("Cannot get trainer by id.");
        })
        .then((data) => {
          console.log(data);
          setTrainer(data);
          setTrainings(data.personalTrainings);
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getTrainerById();
  }, []);

  return (
    <div>
      {trainer && <p>{trainer.name}</p>}
      {trainings.length !== 0 &&
        trainings.map((training) => {
          return (
            <TrainingType
              key={training.id}
              parentToChild={{ training: training, trainerName: trainer.name }}
            />
          );
        })}
    </div>
  );
};
export default TrainerPage;
