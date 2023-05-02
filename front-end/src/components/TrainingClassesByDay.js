import { useEffect, useState } from "react";
import TrainingClass from "./TrainingClass";

const TrainingClassesByDay = (props) => {
  const localDateOfClass = props.parentToChild.nameOfWeekDay.localDateOfClass;
  const clubId = props.parentToChild.clubId;
  const accessToken = localStorage.getItem("accessToken");
  const [classes, setClasses] = useState();
  const getClassesByDay = () => {
    try {
      fetch(`http://localhost:8080/api/class/next-7-days/${clubId}`, {
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
          return Promise.reject(
            "Cannot fetch classes by club id for given date."
          );
        })
        .then((data) => {
          const dataFiltered = data.filter((d) => {
            return (
              new Date(d.classDate).toLocaleDateString() === localDateOfClass
            );
          });
          setClasses(dataFiltered);
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getClassesByDay();
  }, []);

  return (
    <div>
      {classes &&
        classes.map((c) => {
          return <TrainingClass key={c.id} parentToChild={c} />;
        })}
    </div>
  );
};
export default TrainingClassesByDay;
