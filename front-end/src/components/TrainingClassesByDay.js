import { useEffect, useState } from "react";
import TrainingClass from "./TrainingClass";

const TrainingClassesByDay = (props) => {
  const id = props.parentToChild.id;
  let styleDiv = null; //pus pt booked classes
  if (id === 1) {
    styleDiv = {
      display: "flex",
      justifyContent: "center",
      marginBottom: "30px",
    };
  }
  const localDateOfClass = props.parentToChild.nameOfWeekDay.localDateOfClass;
  const data = props.parentToChild.data;
  const [classes, setClasses] = useState([]);
  const getClassesByDay = () => {
    const dataFiltered = data.filter((d) => {
      return new Date(d.classDate).toLocaleDateString() === localDateOfClass;
    });
    setClasses(dataFiltered);
  };
  useEffect(() => {
    getClassesByDay();
  }, [data]);

  return (
    <div style={styleDiv}>
      {classes !== [] &&
        classes.map((c) => {
          return <TrainingClass key={c.id} parentToChild={c} />;
        })}
    </div>
  );
};
export default TrainingClassesByDay;
