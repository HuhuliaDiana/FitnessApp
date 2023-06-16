import {
  FaCalendarDay,
  FaClock,
  FaLocationArrow,
  FaUserAlt,
} from "react-icons/fa";
const PTSession = (props) => {
  const ptSession = props.parentToChild;
  const trainerName = ptSession.userPersonalTraining.personalTrainer.name;
  return (
    <div
      style={{
        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
        width: "250px",
        padding: "15px",
        marginRight: "30px",
        fontWeight: "bold",
        marginBottom: "30px",
      }}
    >
      <p style={{ color: "#EE5007" }}>{trainerName}</p>
      <p style={{ color: "#006E7F" }}>
        {ptSession.startSessionTime} - {ptSession.endSessionTime}
      </p>
      <p style={{ color: "#006E7F" }}>{ptSession.sessionDate}</p>
    </div>
  );
};
export default PTSession;
