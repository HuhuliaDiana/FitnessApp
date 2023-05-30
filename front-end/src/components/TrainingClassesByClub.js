import { useEffect, useState } from "react";
import TrainingClassesByDay from "../components/TrainingClassesByDay";

const TrainingClassesByClub = (props) => {
  const [data, setData] = useState([]);
  const [namesOfWeekDays, setNamesOfWeekDays] = useState([]);

  const club = props.parentToChild.club;
  const dataFromParent = props.parentToChild.data;

  useEffect(() => {
    let newData = dataFromParent.filter((d) => d.club.id === club.id);
    const namesOfDays = newData.map((c) => {
      const nameOfWeekDay = new Date(c.classDate).toLocaleDateString("en-us", {
        weekday: "long",
      });
      const localDateOfClass = new Date(c.classDate).toLocaleDateString();
      const dayOfMonth = new Date(c.classDate).getDate();
      const month = new Date(c.classDate).toLocaleDateString("en-us", {
        month: "long",
      });
      return {
        id: c.id,
        nameOfWeekDay: nameOfWeekDay,
        localDateOfClass: localDateOfClass,
        dayOfMonth: dayOfMonth,
        month: month,
      };
    });
    setNamesOfWeekDays(removeJSONDuplicates(namesOfDays));
    setData(newData);
  }, [dataFromParent]);

  const removeJSONDuplicates = (namesOfWeekDays) => {
    var uniqueArray = [];
    for (var i = 0; i < namesOfWeekDays.length; i++) {
      if (
        !uniqueArray.find(
          (x) => x.nameOfWeekDay === namesOfWeekDays[i].nameOfWeekDay
        )
      ) {
        uniqueArray.push(namesOfWeekDays[i]);
      }
    }
    return uniqueArray;
  };
  return (
    <div key={club.id} style={{}}>
      <p
        style={{ padding: "10px", backgroundColor: "#006E7F", color: "white" }}
      >
        {club.name}
      </p>
      <div style={{ display: "flex" }}>
        {namesOfWeekDays !== [] &&
          namesOfWeekDays.map((nameOfWeekDay) => {
            return (
              <div
                key={nameOfWeekDay.id}
                style={{
                  "margin-right": "20px",
                  width: "200px",
                }}
              >
                <div
                  style={{
                    backgroundColor: "#B22727",
                    color: "white",
                    padding: "10px",
                    "box-shadow": "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                  }}
                >
                  <text>
                    <b>{nameOfWeekDay.nameOfWeekDay}</b>
                  </text>
                  <br></br>
                  <text style={{ fontSize: "15px" }}>
                    {nameOfWeekDay.dayOfMonth} {nameOfWeekDay.month}
                  </text>
                </div>
                <TrainingClassesByDay parentToChild={{ nameOfWeekDay, data }} />
              </div>
            );
          })}
      </div>
    </div>
  );
};
export default TrainingClassesByClub;
