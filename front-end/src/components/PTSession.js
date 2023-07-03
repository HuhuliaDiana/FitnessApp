import {
  FaCalendarDay,
  FaClock,
  FaLocationArrow,
  FaUserAlt,
} from "react-icons/fa";
const PTSession = (props) => {
  const ptSession = props.parentToChild;
  return (
    <div
      style={{
        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
        width: "150px",
        padding: "10px 15px 10px 15px",
        marginRight: "30px",
        fontWeight: "bold",
        marginBottom: "30px",
      }}
    >
      <p style={{ color: "#006E7F" }}>{ptSession.sessionDate}</p>

      <p style={{ color: "#EE5007" }}>
        {ptSession.startSessionTime} - {ptSession.endSessionTime}
      </p>
    </div>
  );
};
export default PTSession;
