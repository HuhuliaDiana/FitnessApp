import { useEffect, useState } from "react";
import TrainingClass from "./TrainingClass";

const TrainingClassesByDay = (props) => {
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
    <div style={{}}>
      {classes !== [] &&
        classes.map((c) => {
          return <TrainingClass key={c.id} parentToChild={c} />;
        })}
    </div>
  );
};
export default TrainingClassesByDay;
