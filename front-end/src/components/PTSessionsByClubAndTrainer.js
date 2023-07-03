import { useEffect, useState } from "react";
import PTSessionByTrainer from "../components/PTSessionsByTrainer";

const PTSessionsByClubAndTrainer = (props) => {
  const club = props.parentToChild.club;
  const [data, setData] = useState([]);
  const [nonDuplicateData, setNonDuplicateData] = useState([]);
  const dataFromParent = props.parentToChild.data;
  useEffect(() => {
    let data = dataFromParent.filter(
      (d) => d.userPersonalTraining.personalTrainer.clubs[0].id === club.id
    );
    setNonDuplicateData(data);
    setData(removeJSONDuplicatesTrainers(data));
  }, [dataFromParent]);
  const removeJSONDuplicatesTrainers = (data) => {
    var uniqueArray = [];
    for (var i = 0; i < data.length; i++) {
      if (
        !uniqueArray.find(
          (x) =>
            x.userPersonalTraining.personalTrainer.name ===
            data[i].userPersonalTraining.personalTrainer.name
        )
      ) {
        uniqueArray.push(data[i]);
      }
    }
    return uniqueArray;
  };

  return (
    <div key={club.id}>
      <p
        style={{
          padding: "10px",
          backgroundColor: "#006E7F",
          color: "white",
          fontSize: "18px",
          marginBottom: "0px",
          fontWeight: "bold",
        }}
      >
        {club.name}
      </p>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {data !== [] &&
          data.map((bookingPT) => {
            return (
              <div
                key={bookingPT.id}
                style={{
                  width: "100%",
                }}
              >
                <div
                  style={{
                    backgroundColor: "#EE5007",
                    color: "white",
                    padding: "5px",
                    "box-shadow": "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                    marginBottom: "30px",
                  }}
                >
                  <text>
                    <b>{bookingPT.userPersonalTraining.personalTrainer.name}</b>
                  </text>
                </div>
                <PTSessionByTrainer parentToChild={{ data:nonDuplicateData }} />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default PTSessionsByClubAndTrainer;
