import { useEffect, useState } from "react";
import TrainingClass from "../components/TrainingClass";
import MenuBar from "../components/MenuBar";
const BookedClassesHistory = () => {
  const accessToken = localStorage.getItem("accessToken");
  const [bookedClasses, setBookedClasses] = useState([]);

  const getBookedClassesHistory = () => {
    try {
      fetch(`http://localhost:8080/api/class/booked/history`, {
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
          return Promise.reject("Cannot get history of booked classes.");
        })
        .then((data) => {
          console.log("booked classes: ");
          console.log(data);

          setBookedClasses(data);
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getBookedClassesHistory();
  }, []);
  return (
    <div>
      {/* <MenuBar></MenuBar> */}
      {bookedClasses.length !== 0 &&
        bookedClasses.map((trainingClass) => {
          return  <TrainingClass
              key={trainingClass.id}
              parentToChild={trainingClass}
            />
          
        })}
      {bookedClasses.length == 0 && (
        <p>You haven't attended any booked class yet.</p>
      )}
    </div>
  );
};
export default BookedClassesHistory;
