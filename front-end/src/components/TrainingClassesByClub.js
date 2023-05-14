import { useEffect, useState } from "react";
import TrainingClassesByDay from "../components/TrainingClassesByDay";

const TrainingClassesByClub = (props) => {
  const club = props.parentToChild.club;
  const data = props.parentToChild.data;

  const [namesOfWeekDays, setNamesOfWeekDays] = useState([]);

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
  useEffect(() => {
    let newData = data.filter((d) => d.club.id === club.id);
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
  }, []);
  return (
    <div key={club.id}>
      <b>{club.name}</b>
      <div>
        {namesOfWeekDays !== [] &&
          namesOfWeekDays.map((nameOfWeekDay) => {
            return (
              <div key={nameOfWeekDay.id}>
                <p>
                  <b>
                    {nameOfWeekDay.nameOfWeekDay} - {nameOfWeekDay.dayOfMonth}{" "}
                    {nameOfWeekDay.month}
                  </b>
                </p>
                <TrainingClassesByDay
                  parentToChild={{ nameOfWeekDay,  data }}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};
export default TrainingClassesByClub;