import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MenuBar from "../components/MenuBar";
import TrainingType from "../components/TrainingType";

const TrainerPage = () => {
  const accessToken = localStorage.getItem("accessToken");
  const [srcImg, setSrcImg] = useState("");

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
          switch (data.sex) {
            case "M":
              setSrcImg("/male-yellow.svg");
              break;
            default:
              setSrcImg("/female-orange.svg");
              break;
          }
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
            "box-shadow": "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
            padding: "3px",
          }}
        >
          <p
            style={{
              "font-size": "120%",
              "font-weight": "bold",
              "margin-left": "15px",
              color:"#006E7F"

            }}
          >
            Welcome to Fit & Repeat
          </p>
        </div>
        <div className="child">
          <div
            style={{
              "box-shadow": "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
              display: "flex",
              height: "50px",
              "flex-direction": "row",
              "justify-content": "space-between",
            }}
          >
            <div
              style={{
                "margin-top": "auto",
                "margin-bottom": "auto",
                "margin-left": "20px",
              }}
            >
              Choose a Personal Training
            </div>
          </div>
          <div
            style={{
              "box-shadow": "rgba(0, 0, 0, 0.24) 0px 3px 8px",
              "margin-top": "100px",
              display: "flex",
              width: "80%",
              "margin-left": "10%",
            }}
          >
            <div style={{ width: "40vh", margin: "auto" }}>
              <img
                src={srcImg}
                alt="image"
                style={{ width: "80%", padding: "50px" }}
              />
            </div>
            <div
              style={{
                "box-shadow":
                  "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
                width: "80%",
                display: "flex",
                "flex-direction": "column",
              }}
            >
              <div
                style={{
                  "box-shadow": "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                  fontSize: "25px",
                }}
              >
                {trainer && <p style={{ color: "#006E7F",fontWeight:"bold" }}>{trainer.name}</p>}
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  "flex-wrap": "wrap",
                  marginTop:"auto",
                  marginBottom:"auto",
                  padding: "30px",
                }}
              >
                {trainings.length !== 0 &&
                  trainings.map((training) => {
                    return (
                      <TrainingType
                        key={training.id}
                        parentToChild={{
                          training: training,
                          trainer: trainer,
                        }}
                      />
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TrainerPage;
